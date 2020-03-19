import React from 'react'

const Course = ({ course }) => {
    return (
      <>
        <Header courseName={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }
  
  const Header = (props) => <h2>{props.courseName}</h2>
  
  const Content = ({ parts }) => {
  
    const rows = () => parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)
  
    return (
      <>
        {rows()}
      </>
    )
  }
  
  const Total = ({ parts }) => {
  
    const sum = () => parts.reduce((a, i) => a + i.exercises, 0)
  
    return (
      <p><strong>Number of exercises {sum()}</strong></p>
    )
  }
  
  const Part = ({ name, exercises }) => (
    <p>
      {name} {exercises}
    </p>
  )

  export default Course