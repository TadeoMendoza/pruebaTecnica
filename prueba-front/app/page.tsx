import Image from "next/image";
import { Form } from "./components/ui/Form"
import { DataTable } from "./components/ui/DataTable";

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <Form />
      <DataTable />
    </div>
  );
}
