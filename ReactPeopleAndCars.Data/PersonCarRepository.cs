using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace ReactPeopleAndCars.Data
{
    public class PersonCarRepository
    {
        private readonly string _connectionString;
        public PersonCarRepository(string conn)
        {
            _connectionString = conn;
        }

        public List<Person> GetAllPeople()
        {
            using (var cxt = new PersonCarContext(_connectionString))
            {
                return cxt.People.Include(p => p.Cars).ToList();   
            }
        }
      
        public void AddPerson(Person person)
        {
            using (var cxt = new PersonCarContext(_connectionString))
            {
                cxt.People.Add(person);
                cxt.SaveChanges();
            }
        }
        public void AddCarForPerson(Car car, int personId)
        {
            using (var cxt = new PersonCarContext(_connectionString))
            {
                cxt.People.FirstOrDefault(p => personId == p.Id).Cars.Add(car);
                cxt.SaveChanges();
            }
        }
        public Person GetPersonById(int id)
        {
            using (var cxt = new PersonCarContext(_connectionString))
            {
                return cxt.People.FirstOrDefault(p => p.Id == id);
            }
        }
        public Person GetCarsById(int id)
        {
            using (var cxt = new PersonCarContext(_connectionString))
            {
                return cxt.People.Include(p => p.Cars).FirstOrDefault(p => p.Id == id);
            }
        }

        public void DeleteCarsForPerson(int id)
        {
            using (var cxt = new PersonCarContext(_connectionString))
            {
                var carsToDelete = cxt.Cars.Where(c => c.PersonId == id);
                cxt.Cars.RemoveRange(carsToDelete);
                cxt.SaveChanges();
            }
        }

    }
}
