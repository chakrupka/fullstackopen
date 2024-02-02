const ListPersons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <p key={person.name + person.number}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

export default ListPersons
