using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.API.Data;
using TodoApp.API.Models;

namespace TodoApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly ToDoDbContext _context;

        public ToDoController(ToDoDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetToDos()
        {
            var todos = await _context.ToDos.Where(td => td.IsDeleted == false).OrderBy(td => td.DateCreated).ToListAsync();
            return Ok(todos);
        }

        [HttpPost]
        public async Task<IActionResult> CreateToDo(ToDo todo)
        {
            todo.Id = Guid.NewGuid();

            await _context.ToDos.AddAsync(todo);
            await _context.SaveChangesAsync();
            return StatusCode(StatusCodes.Status201Created, todo);
        }

        [HttpPost]
        [Route("{id}/update")]
        public async Task<IActionResult> UpdateToDo([FromRoute] Guid id, ToDo todo)
        {
            var todoToUpdate = await _context.ToDos.FindAsync(id);

            if (todoToUpdate == null)
            {
                return NotFound();
            }
            else
            {
                todoToUpdate.IsCompleted = todo.IsCompleted;
                todoToUpdate.DateCompleted = todo.IsCompleted ? DateTime.Now : null;
                _context.ToDos.Update(todoToUpdate);
                await _context.SaveChangesAsync();
                return Ok(todoToUpdate);
            }
        }

        [HttpDelete]
        [Route("{id}/delete")]
        public async Task<IActionResult> DeleteToDo([FromRoute] Guid id)
        {
            var todoToDelete = await _context.ToDos.FindAsync(id);

            if (todoToDelete == null)
            {
                return NotFound();
            }
            else
            {
                todoToDelete.IsDeleted = true;
                todoToDelete.DateDeleted = DateTime.Now;
                _context.ToDos.Update(todoToDelete);
                await _context.SaveChangesAsync();
                return Ok();
            }
        }
    }
}
