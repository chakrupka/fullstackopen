const Header = ({ courseName }) => <h1>{courseName}</h1>

const Content = ({ content }) => {
  return (
    <div>
      {content.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  )
}

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ parts }) => {
  const total = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  )
  return <b>total of {total} exercises</b>
}

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content content={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
