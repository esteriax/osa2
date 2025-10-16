const Course = (props) => {
return (
  <div>
    <Header course={props.course} />
    <Content parts={props.course.parts} />
  </div>
)
}
const Header = (props) => <h1>{props.course.name}</h1>

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

/*const Total = (props) => <p>Number of exercises {props.total}</p>*/

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App