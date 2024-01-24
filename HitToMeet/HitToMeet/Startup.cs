using AutoMapper;
using HitToMeet.Core.Options;
using HitToMeet.DAL;
using HitToMeet.DAL.Entities;
using HitToMeet.DAL.Interfaces;
using HitToMeet.DAL.Managers;
using HitToMeet.DAL.Repositories;
using HitToMeet.Filters.ActionFilters;
using HitToMeet.Filters.ExceptionFilters;
using HitToMeet.Mappers;
using HitToMeet.WebServices.Interfaces;
using HitToMeet.WebServices.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using HitToMeet.BL.Interfaces;
using HitToMeet.BL.Services;

namespace HitToMeet
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            this.Configuration = configuration;
            this.Env = env;
        }

        public IWebHostEnvironment Env { get; }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            IdentityModelEventSource.ShowPII = true;
            this.InstallFilters(services);
            this.InstallPresentation(services);
            this.InstallBussinessLogic(services);
            this.InstallDataAccess(services);
            this.InstallJwt(services);
            this.InstallServices(services);
            this.InstallSwagger(services);
            this.InstallAutoMapper(services);

            services.AddMvc().ConfigureApiBehaviorOptions(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });
            services.AddControllers();
            services.AddCors();
            services.AddSignalR();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            try
            {
                var swaggerOptions = new SwaggerOptions();
                this.Configuration.GetSection(nameof(SwaggerOptions)).Bind(swaggerOptions);
                app.UseSwagger();
                app.UseSwaggerUI(s =>
                {
                    s.SwaggerEndpoint(swaggerOptions.JsonRoute, swaggerOptions.Description);
                    s.RoutePrefix = "swagger";
                });
                if (env.IsDevelopment())
                {
                    app.UseDeveloperExceptionPage();
                }

                app.UseHttpsRedirection();
                app.UseRouting();
                app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
                app.UseAuthorization();
                app.UseAuthentication();
                app.UseEndpoints(endpoints =>
                {
                    endpoints.MapControllers();
                });

                app.UseStaticFiles();
                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "front-end";

                    if (env.IsDevelopment())
                    {
                        spa.UseReactDevelopmentServer(npmScript: "start");
                    }
                });
            }
            catch (Exception ex)
            {
                logger.LogError(ex.Message);
            }
        }

        private void InstallBussinessLogic(IServiceCollection services)
        {
            services.AddScoped<UserManager>();
            services.AddScoped<IRepository, Repository>();
        }

        private void InstallDataAccess(IServiceCollection services)
        {
            string connection;
            if (!this.Env.IsDevelopment())
            {
                Console.WriteLine("Database in prod mode");
                connection = this.Configuration.GetConnectionString("DefaultConnectionProd");
            }
            else
            {
                Console.WriteLine("Database in dev mode");
                connection = this.Configuration.GetConnectionString("DefaultConnection");
            }

            services.AddDbContext<AppDbContext>(options => {
                options.UseSqlServer(connection);
            });
            services.AddIdentityCore<User>(options => {
                options.Password.RequiredLength = 6;
                options.Password.RequireLowercase = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
            }).AddEntityFrameworkStores<AppDbContext>();

            services.BuildServiceProvider().GetService<AppDbContext>().Database.Migrate();
        }

        private void InstallServices(IServiceCollection services)
        {
            services.AddScoped<IIdentityService, IdentityService>();
        }

        private void InstallFilters(IServiceCollection services)
        {
            services.AddScoped<HitToMeetExceptionsFilterAttribute>();
            services.AddScoped<ModelValidationAttribute>();
        }

        private void InstallAutoMapper(IServiceCollection services)
        {
            var blAssembly = Assembly.Load("HitToMeet.BL");
            var dalAssembly = Assembly.Load("HitToMeet.DAL");
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddMaps(Assembly.GetExecutingAssembly());
                mc.AddMaps(blAssembly);
                mc.AddMaps(dalAssembly);
                mc.AddProfile(new MapperProfile());
            });

            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);
        }

        private void InstallPresentation(IServiceCollection services)
        {
            services.AddScoped<IQuizService, QuizService>();
            services.AddScoped<ICasinoService, CasinoService>();
        }

        private void InstallJwt(IServiceCollection services)
        {
            JwtOptions.Secret = this.Configuration.GetSection(nameof(JwtOptions)).GetSection("Secret").Value;
            JwtOptions.TokenLifeTime = TimeSpan.Parse(this.Configuration.GetSection(nameof(JwtOptions)).GetSection("TokenLifeTime").Value);

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(JwtOptions.Secret)),
                ValidateAudience = false,
                ValidateIssuer = false,
                RequireExpirationTime = true,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero,   // Instead of 5 minutes
            };
            services.AddSingleton(tokenValidationParameters);
            services.AddAuthentication(p =>
            {
                p.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                p.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                p.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(p =>
            {
                p.SaveToken = true;
                p.TokenValidationParameters = tokenValidationParameters;
            });
            JwtOptions.Secret = JwtOptions.Secret;
        }

        private void InstallSwagger(IServiceCollection services)
        {
            services.AddSwaggerGen(s =>
            {
                s.SwaggerDoc("v0", new OpenApiInfo { Version = "v0", Title = "HitToMeetAPI" });
#pragma warning disable SA1118 // Parameter must not span multiple lines
                s.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the bearer scheme",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey
                });
#pragma warning restore SA1118 // Parameter must not span multiple lines
                s.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                            Id = "Bearer",
                            Type = ReferenceType.SecurityScheme
                            }
                        },
                        new List<string>()
                    }
                });
            });
        }
    }
}
