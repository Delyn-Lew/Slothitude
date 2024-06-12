import AddClassForm from "./AddClassForm";

export default function AddClassPage() {
  return (
    <div className="flex justify-center mt-16">
      <section className="text-xl bg-white bg-opacity-80 w-[100rem] p-5 rounded-lg flex flex-col justify-center items-center drop-shadow-xl">
        <h2 className="text-center">Add Class</h2>
        <AddClassForm />
      </section>
    </div>
  );
}
