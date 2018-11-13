using CourseRegistration.Controllers;
using CourseRegistration.Data;
using CourseRegistration.Models;
using CourseRegistration.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Linq;
using Xunit;

namespace CourseRegistration.Tests
{
    public class RegistrationServiceShould
    {
        [Fact]
        public void Get_All_Courses()
        {
            RegistrationService service = new RegistrationService();

            var courses = service.GetCourses();

            Assert.Equal(3, courses.Count());
        }

        [Fact]
        public void Add_New_Registration()
        {
            var mockRegistrationService = new Mock<IRegistrationService>();

            var registration = new Registration
            {
                CourseName = "Learn C#",
                DateTime = DateTime.Now.ToString(),
                Email = "someone@someone.com",
                Name = "Someone"
            };

            mockRegistrationService.Setup(r => r.RegisterCourse(registration));
            var controller = new RegistrationController(mockRegistrationService.Object);

            var actionResult = controller.Post(registration);
            var result = Assert.IsType<OkResult>(actionResult);
            Assert.Equal(200, result.StatusCode);

            mockRegistrationService.Verify(s => s.RegisterCourse(registration), Times.Once());
        }
    }
}
