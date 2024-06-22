import { db } from "@/lib/db";
const OrganizationIdPage = () => {
  return (
    <div>
      <form action={create}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter the board title"
          className="border-input border p-1"
        />
      </form>
    </div>
  );
};
export default OrganizationIdPage;
