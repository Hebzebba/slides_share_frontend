"use client";
import { useEffect, useState } from "react";
import Header from "../Header";
import { usePathname } from "next/navigation";
import { authorize } from "@/app/auth/auth";

const page = () => {
  const [lecturers, setLecturers] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    authorize(pathname);

    fetch(`http://localhost:8000/api/v1/lecturer/all`)
      .then((res) => res.json())
      .then((data) => setLecturers(data))
      .catch((error) => console.log("Failed to fetch"));
  }, []);

  console.log(lecturers);
  return (
    <div className="admin-container">
      <Header />
      <div className="content-container">
        <div className="content">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {lecturers &&
                lecturers.map((lecturer, key) => (
                  <tr key={key}>
                    <td>{lecturer.name}</td>
                    <td>{lecturer.email}</td>
                    <td>{lecturer.role}</td>
                    <td>
                      <button>Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default page;
