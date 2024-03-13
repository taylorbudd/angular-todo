namespace TodoApp.API.Models
{
    public class ToDo
    {
        public Guid Id { get; set; }

        public string Description { get; set; }

        public DateTime DateCreated { get; set; }

        public bool IsCompleted { get; set; }

        public DateTime? DateCompleted { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DateDeleted { get; set; }
    }
}
