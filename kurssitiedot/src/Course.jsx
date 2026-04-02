const Course = (props) => {
return (
  <div>
    <Header course={props.course} />
    <Content parts={props.course.parts} />
    <Total parts={props.course.parts} />
  </div>
)
}
const Header = (props) => <h2>{props.course.name}</h2>

const Content = (props) => {
  const parts = props.parts
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part} />
      )}
    </div>
  )
}

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <p>total of {total} exercises</p>
  )
}

export default Course