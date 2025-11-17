using System.ComponentModel.DataAnnotations;

namespace mywebapicore.Models
{
    public class Employee
    {
        [Key]
        public int id { get; set; }
        public string? empname { get; set; }
        public string? salary { get; set; }
        public string? dob { get; set; }
        public string? department { get; set; }
        public string? gender { get; set; }

    }
}