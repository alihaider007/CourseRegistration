using CourseRegistration.Data;
using CourseRegistration.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CourseRegistration.Services
{
    public class RegistrationService : IRegistrationService
    {
        public IEnumerable<Course> GetCourses()
        {
            return new List<Course>
            {
                new Course
                {
                    Id = 1,
                    Name = "Learn C#",
                    Date = DateTime.Today.AddDays(5)
                },
                new Course
                {
                    Id = 2,
                    Name = "Learn ASP.NET Core",
                    Date = DateTime.Today.AddDays(10)
                },
                new Course
                {
                    Id = 3,
                    Name = "Learn Angular 6",
                    Date = DateTime.Today.AddDays(15)
                }
            };
        }

        public void RegisterCourse(Registration registration)
        {
            var filePath = AppDomain.CurrentDomain.BaseDirectory + "course_registration.json";
            if(!File.Exists(filePath))
            {
                File.WriteAllText(filePath, string.Empty);
            }
            
            // Read existing json data
            var jsonData = File.ReadAllText(filePath);
            
            // De-serialize to object or create new list
            var registrationList = JsonConvert.DeserializeObject<List<Registration>>(jsonData)
                                  ?? new List<Registration>();

            registrationList.Add(registration);

            // Update json data string
            jsonData = JsonConvert.SerializeObject(registrationList, Formatting.Indented);

            File.WriteAllText(filePath, jsonData);
        }
    }
}
