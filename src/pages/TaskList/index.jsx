import React, { useRef, useState } from 'react';
import './styles.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from '../../components/Table';
import { todoTaskList } from '../../store/todo/selectors';
import Dialog from '../../components/Dialog';
import Button from '../../components/Button';
import DropDown from '../../components/DropDown';
import actions from '../../store/todo/actions';
import { authCurrentUser } from '../../store/auth/selectors';
import { formatDate } from '../../utils';
import TaskListFilters from './TaskListFilters';
import Pagination from '../../components/Pagination';

function TaskList({
  user, values, taskCreate, taskUpdate, tackDelete,
}) {
  const columns = [
    '#',
    'Name',
    'Date',
    'Status',
    'Action',
  ].map((item) => (<span>{item}</span>));

  const actionList = [
    { label: 'View', value: 'view' },
    { label: 'Edit', value: 'edit' },
    { label: 'Delete', value: 'delete' },
  ];

  const initDialogDataState = { show: false };
  const [dialogData, setDialogData] = useState(initDialogDataState);

  const [filters, setFilters] = useState({ });

  const [page, setPage] = useState(1);
  const total = useRef(Math.ceil(values.length / 10));
  const [range, setRange] = useState(5);

  const initBuffer = {};
  const buffer = useRef(initBuffer);

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ renderEditForm ~~~ */

  const renderEditForm = ({
    task, onChange, onSave, onClose,
  }) => (
    <form>
      <div className="tbg-dialog__content">
        <input
          className="tbg-input-text"
          type="text"
          name="name"
          defaultValue={task.name}
          onChange={onChange}
        />
        <label htmlFor="edit-form-checkbox">
          <input
            id="edit-form-checkbox"
            type="checkbox"
            name="status"
            defaultChecked={task.status}
            onChange={onChange}
          />
          Complete
        </label>
        <textarea
          className="tbg-textarea"
          rows={3}
          name="description"
          defaultValue={task.description}
          onChange={onChange}
        />
      </div>
      <div className="tbg-dialog__actions">
        <Button label="Save" onClick={onSave} />
        <Button label="Close" onClick={onClose} />
      </div>
    </form>
  );

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ handleOnClickAction ~~~ */

  const handleOnClickAction = (value, taskId) => {
    const task = values.find((item) => item.number === taskId);
    switch (value) {
      case 'view':
        setDialogData({
          show: true,
          title: 'Task View',
          children: (
            <>
              <h3>{task.name}</h3>
              <p>{task.description}</p>
            </>
          ),
          onClose: () => setDialogData(initDialogDataState),
        });
        return;
      case 'edit':
        setDialogData({
          show: true,
          title: 'Task Edit',
          render: renderEditForm({
            task,
            onChange: ({ target }) => {
              buffer.current.number = task.number;
              switch (target.name) {
                case 'status':
                  buffer.current.status = Number(target.checked);
                  return;
                case 'name':
                case 'description':
                  buffer.current[target.name] = target.value;
                  return;
                default:
                  console.log(task.name, Object.keys(target));
              }
            },
            onSave: () => {
              taskUpdate(buffer.current);
              buffer.current = initBuffer;
              setDialogData(initDialogDataState);
            },
            onClose: () => {
              setDialogData(initDialogDataState);
            },
          }),
        });
        return;
      case 'delete':
        setDialogData({
          show: true,
          children: (<div style={{ textAlign: 'center' }}>{`Delete task #${task.number}?`}</div>),
          action: (
            <>
              <Button
                label="Delete"
                onClick={() => {
                  tackDelete(task.number);
                  setDialogData(initDialogDataState);
                }}
              />
              <Button
                label="Cancel"
                onClick={() => setDialogData(initDialogDataState)}
              />
            </>
          ),
        });
        return;
      default:
        console.log(`Task #${taskId}:`, value);
    }
  };

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ renderValues ~~~ */

  const renderValues = (data) => {
    let result = data;

    Object.keys(filters).forEach((key) => {
      result = result.filter((item) => ((key === 'date')
        ? formatDate(item[key]) === formatDate(filters[key])
        : item[key] === filters[key]));
    });

    const startItem = ((page - 1) * range > values.length - 1) ? 0 : (page - 1) * range;
    const endItem = ((startItem + range) > values.length - 1) ? values.length : (startItem + range);
    total.current = Math.ceil(result.length / range);
    result = result.filter((item, index) => index >= startItem && index < endItem);

    return result.map((item) => ({
      number: item.number,
      name: item.name,
      date: formatDate(item.date),
      status: item.status
        ? (
          <span
            className="tbg-task-list__status tbg-task-list__status--complete"
            children="Complete"
          />
        )
        : (
          <span
            className="tbg-task-list__status tbg-task-list__status--in-work"
            children="In work"
          />
        ),
      action: (
        <DropDown
          label="Action"
          actionList={actionList}
          onAction={(value) => handleOnClickAction(value, item.number)}
        />
      ),
    }));
  };

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ handleAddTask ~~~ */

  const handleAddTask = () => {
    buffer.current = {
      userId: user.id,
      date: Date.now(),
      status: 0,
    };

    setDialogData({
      show: true,
      title: 'Add task',
      render: (
        <form>
          <div className="tbg-dialog__content">
            <input
              className="tbg-input-text"
              placeholder="Task name"
              type="text"
              onChange={({ target }) => { buffer.current.name = target.value; }}
            />
            <textarea
              className="tbg-textarea"
              placeholder="Task description"
              rows={3}
              onChange={({ target }) => { buffer.current.description = target.value; }}
            />
          </div>
          <div className="tbg-dialog__actions">
            <Button
              label="Add"
              onClick={() => {
                taskCreate(buffer.current);
                buffer.current = initBuffer;
                setDialogData(initDialogDataState);
              }}
            />
            <Button
              label="Close"
              onClick={() => {
                buffer.current = initBuffer;
                setDialogData(initDialogDataState);
              }}
            />
          </div>
        </form>
      ),
    });
  };

  /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ return ~~~ */

  return (
    <main>
      <h2>My Tasks</h2>
      <div className="tbg-task-list">
        <div className="tbg-task-list__header">
          <Button
            label="Add task"
            onClick={handleAddTask}
          />
          <TaskListFilters onChange={setFilters} />
        </div>
        <Table
          columns={columns}
          values={renderValues(values)}
        />
        <Pagination
          page={page}
          total={total.current}
          range={range}
          onChange={(i) => setPage(i)}
          onChangeRange={(i) => setRange(i)}
        />
      </div>
      <Dialog {...dialogData} />
    </main>
  );
}

TaskList.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.number,
      name: PropTypes.string,
      description: PropTypes.string,
      date: PropTypes.number,
      status: PropTypes.number,
    }).isRequired,
  ).isRequired,
  taskCreate: PropTypes.func.isRequired,
  taskUpdate: PropTypes.func.isRequired,
  tackDelete: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return ({
    user: authCurrentUser(state),
    values: todoTaskList(state),
  });
}

function mapDispatchToProps(dispatch) {
  return ({
    taskCreate: (payload) => dispatch(actions.todoCreate(payload)),
    taskUpdate: (payload) => dispatch(actions.todoUpdate(payload)),
    tackDelete: (payload) => dispatch(actions.todoDelete(payload)),
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
