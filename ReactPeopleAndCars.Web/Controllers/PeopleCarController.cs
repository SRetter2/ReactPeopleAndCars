using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactPeopleAndCars.Data;
using ReactPeopleAndCars.Web.Models;

namespace ReactPeopleAndCars.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleCarController : ControllerBase
    {
        private readonly string _connectionString;
        public PeopleCarController(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("ConStr");
        }

        [HttpGet]
        [Route("getall")]
        public List<Person> GetPeople()
        {
            var repo = new PersonCarRepository(_connectionString);
            return repo.GetAllPeople();
        }
        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var repo = new PersonCarRepository(_connectionString);
            repo.AddPerson(person);
        }
        [HttpPost]
        [Route("addcar")]
        public void AddCarforPerson(AddCarViewModel vm)
        {
            var repo = new PersonCarRepository(_connectionString);
            repo.AddCarForPerson(vm.Car, vm.PersonId);
        }
        [HttpGet]
        [Route("getpersonbyid")]
        public Person GetPerson(int id)
        {
            var repo = new PersonCarRepository(_connectionString);
            return repo.GetPersonById(id);
        }
        [HttpGet]
        [Route("getcarsbyid")]
        public List<Car> GetCars(int id)
        {
            var repo = new PersonCarRepository(_connectionString);
            var person = repo.GetCarsById(id);
            return person.Cars;
        }
        [HttpPost]
        [Route("deletecars")]
        public void DeleteCarsforPerson(Person person)
        {
            var repo = new PersonCarRepository(_connectionString);
            repo.DeleteCarsForPerson(person.Id);
        }
    }
}