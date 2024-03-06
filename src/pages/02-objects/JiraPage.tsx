import { JiraTasks } from '../../components';
import { useTaskStore } from '../../stores';

export const JiraPage = () => {
  const openTaks = useTaskStore(state => state.getTaskByStatus("open"));
  const inProgressTaks = useTaskStore(state => state.getTaskByStatus("in-progress"));
  const doneTaks = useTaskStore(state => state.getTaskByStatus("done"));
  return (
    <>
      <h1>Tareas</h1>
      <p>Manejo de estado con objectos de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


        <JiraTasks title='Pendientes' status='open' tasks={openTaks}/>

        <JiraTasks title='Avanzando' status='in-progress' tasks={inProgressTaks} />

        <JiraTasks title='Terminadas' status='done' tasks={doneTaks}/>

      </div>





    </>
  );
};