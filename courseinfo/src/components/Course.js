const Course = ({ course }) => {
  const totalExercises = course.parts.reduce((total, part) => {
    return total + part.exercises;
  }, 0);

  return (
    <>
      <h1>{course.name}</h1>
      {course.parts.map((part) => {
        return (
          <p key={part.id}>
            {part.name} {part.exercises}
          </p>
        );
      })}
      <strong>total of {totalExercises} exercises</strong>
    </>
  );
};

export default Course;
