import { useEffect, useState } from "react";
import phonebook from "./services/phonebook";

// components
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const getPersons = async () => {
      const persons = await phonebook.getAllPersons();
      setPersons(persons);
      setFilteredPersons(persons);
    };

    getPersons();
  }, []);

  const [filteredPersons, setFilteredPersons] = useState(persons);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const handleNameInput = (event) => {
    const name = event.target.value;
    setNewName(name);
  };

  const handleNumberInput = (event) => {
    const number = event.target.value;
    setNewNumber(number);
  };

  const handleFilter = (event) => {
    const filter = event.target.value;
    setFilterValue(filter);

    const filteredPersons = persons.filter((person) => {
      return person.name.toLowerCase().includes(filter.toLowerCase());
    });
    setFilteredPersons(filteredPersons);
  };

  const addToPersons = async (event) => {
    event.preventDefault();
    const contactObject = {
      name: newName.trim(),
      number: newNumber.trim(),
    };

    const exists = persons.some((person) => person.name === newName);
    if (exists) {
      window.alert(`${newName} is already added to the phonebook`);
      return;
    }

    if (newNumber.trim() === "") {
      window.alert(`Number is required`);
      return;
    }

    try {
      const addedPerson = await phonebook.addNewPerson(contactObject);
      setPersons(persons.concat(addedPerson));
      setFilteredPersons(filteredPersons.concat(addedPerson));
      setNewName("");
      setNewNumber("");
    } catch (error) {
      console.log(error);
      window.alert("Please try again");
    }
  };

  const deletePerson = async (personId) => {
    const personToDelete = await phonebook.deletePerson(personId);
    
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilter={handleFilter} filterValue={filterValue} />
      <h3>Add a new</h3>
      <PersonForm
        addToPersons={addToPersons}
        newName={newName}
        handleNameInput={handleNameInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
      />
      <h3>Numbers</h3>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
