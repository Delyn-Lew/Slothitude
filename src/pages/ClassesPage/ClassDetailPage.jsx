import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import debug from "debug";
import { fetchClass } from "../../utilities/classes-service";

const log = debug("slothitude:pages:ClassDetailPage");

export default function ClassDetailPage() {
  const { classId } = useParams();
  const [classDetail, setClassDetail] = useState(null);

  useEffect(() => {
    const getClassDetail = async () => {
      try {
        log("Fetching class details for classId:", classId);
        const classData = await fetchClass(classId);
        log("Fetched class details:", classData);
        setClassDetail(classData);
      } catch (error) {
        log("Error fetching class details", error);
      }
    };
    getClassDetail();
  }, [classId]);

  if (!classDetail) return <div>Loading...</div>;

  return (
    <div className="class-detail-page">
      <h1>{classDetail.name}</h1>
      <p>{classDetail.description}</p>
      <p>Date: {new Date(classDetail.date).toLocaleString()}</p>
      <p>Location: {classDetail.location}</p>
      <p>Instructor: {classDetail.instructor}</p>
      <p>Duration: {classDetail.duration} minutes</p>
    </div>
  );
}
