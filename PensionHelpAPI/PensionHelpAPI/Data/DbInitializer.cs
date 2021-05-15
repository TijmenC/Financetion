using System;
using System.Linq;
using PensionHelpAPI.Models;

namespace PensionHelpAPI.Data
{
    public class DbInitializer
    {

        public static void Initialize(PensionHelpContext context)
        {
            context.Database.EnsureCreated();

            if (context.Savings.Any())
            {
                return;
            }

            var savings = new Saving[]
            {
                new Saving{Description="Car",
                    MaxGoal=4000,
                    CurrentGoal=760
                },

                new Saving{Description="Pension",
                    MaxGoal=100000,
                    CurrentGoal=20000
                },

            };
            foreach (Saving s in savings)
            {
                context.Savings.Add(s);
            }

            context.SaveChanges();

            if (context.Spendings.Any())
            {
                return;
            }

            var spendings = new Spending[]
            {
                new Spending{Description="Netflix",
                    Price=11,
                    Rating=4,
                },

                new Spending{Description="Disney+",
                    Price=7,
                    Rating=3,
                },

            };
            foreach (Spending s in spendings)
            {
                context.Spendings.Add(s);
            }

            context.SaveChanges();
        }
    }
}
