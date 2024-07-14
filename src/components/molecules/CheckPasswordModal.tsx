import useModalStore from '@/stores/modal.store';
import Input from '../atoms/js-Input/Input';
const CheckPasswordModal = ({ password }: { password: string }) => {
  const { closeCheckPasswordModal } = useModalStore((state) => state);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (password) closeCheckPasswordModal();
      }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
    >
      <div className="bg-white p-10 rounded-lg shadow-lg relative ">
        <Input
          type="password"
          label="비밀번호를 입력해주세요"
          autoFocus
          innerClassName="border border-black rounded p-1"
        />
        <button type="submit" className=" text-gray-500 p-1 absolute bottom-3 right-9">
          확인
        </button>
      </div>
    </form>
  );
};
export default CheckPasswordModal;
