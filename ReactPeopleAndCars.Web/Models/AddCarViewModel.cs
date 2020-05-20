using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ReactPeopleAndCars.Data;

namespace ReactPeopleAndCars.Web.Models
{
    public class AddCarViewModel
    {
        public Car Car{get;set;}
        public int PersonId { get; set; }
    }
}
