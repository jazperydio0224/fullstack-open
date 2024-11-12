const Contact = ({ name, number }) => {
  return (
    <div>
      <span>
        {name} {number}
      </span>
      <button>delete</button>
    </div>
  );
};

const Persons = ({ filteredPersons }) => {
  return (
    <>
      {filteredPersons.map((person) => {
        return (
          <Contact
            key={person.name}
            name={person.name}
            number={person.number}
          />
        );
      })}
    </>
  );
};

export default Persons;
