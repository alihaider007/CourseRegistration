using CourseRegistration.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CourseRegistration.Data
{
    public interface IRegistrationService
    {
        IEnumerable<Course> GetCourses();
        void RegisterCourse(Registration registration);
    }
}
