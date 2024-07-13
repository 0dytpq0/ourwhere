import ScheduleForm from '../molecules/ScheduleForm';
import useModalStore from '@/stores/modal.store';
import { Tables } from '@/types/supabase';

type ScheduleType = Tables<'schedule'>;
interface scheduleModalProps {
  schedule?: ScheduleType | null;
  onClose?: () => void;
}

const ScheduleModal = ({ schedule, onClose }: scheduleModalProps) => {
  const toggleScheduleModal = useModalStore((state) => state.toggleScheduleModal);
  const closeModal = () => {
    onClose;
    toggleScheduleModal();
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <div className="bg-white p-10 rounded-lg shadow-lg relative">
        <h2>1</h2>
        <ScheduleForm onClose={onClose} />
        <button onClick={closeModal} className=" text-gray-500 p-1 ">
          x
        </button>
      </div>
    </div>
  );
};

export default ScheduleModal;
