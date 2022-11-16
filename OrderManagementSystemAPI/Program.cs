using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using OrderManagementSystemAPI.Context;
using OrderManagementSystemAPI.Service;
using OrderManagementSystemAPI.Service.Interface;

var builder = WebApplication.CreateBuilder(args);
var connectionstring = builder.Configuration.GetConnectionString("MariaDbConnectionString");

// Add services to the container.
builder.Services.AddDbContextPool<MariaDbContext>(options => options.UseMySql(builder.Configuration.GetConnectionString("MariaDbConnectionString"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("MariaDbConnectionString")), builder =>
{
    builder.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null);
}));

builder.Services.AddScoped<IMariaDbOrganizationService, MariaDbOrganizationService>();
builder.Services.AddScoped<IMariaDbProductService, MariaDbProductService>();
builder.Services.AddScoped<IMariaDbCustomerService, MariaDbCustomerService>();
builder.Services.AddScoped<IMariaDbOrderItemService, MariaDbOrderItemService>();
builder.Services.AddScoped<IMariaDbOrderService, MariaDbOrderService>();
builder.Services.AddScoped<IMariaDbUserService, MariaDbUserService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "ToDo API",
        Description = "An ASP.NET Core Web API for managing ToDo items",
        TermsOfService = new Uri("https://example.com/terms"),
        Contact = new OpenApiContact
        {
            Name = "Example Contact",
            Url = new Uri("https://example.com/contact")
        },
        License = new OpenApiLicense
        {
            Name = "Example License",
            Url = new Uri("https://example.com/license")
        }
    });
});

builder.Services.AddCors(options => options.AddPolicy(name: "OderManagementSystem", 
    policy => 
    {
        policy.WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    }));

var app = builder.Build();
app.UseCors("OderManagementSystem");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
