using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourseRegistration.Data;
using CourseRegistration.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CourseRegistration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IRegistrationService _registrationService;

        public RegistrationController(IRegistrationService registrationService)
        {
            _registrationService = registrationService;
        }

        // GET: api/Registration
        [HttpGet("index")]
        public string index()
        {
            return "Service is Running!";
        }

        // GET: api/Registration/Course
        [HttpGet("Course")]
        public IEnumerable<Course> GetCourses()
        {
            return _registrationService.GetCourses();
        }

        // POST: api/Registration
        [HttpPost]
        public IActionResult Post([FromBody] Registration registration)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            _registrationService.RegisterCourse(registration);

            return Ok();
        }
    }
}
