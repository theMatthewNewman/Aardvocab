there is one global user averages file.
this allows you to compare your average to everyone elses average.
I am doing this instead of calculating everyones averages on the front end 
to save on amount of data stored 

there is only one global averages file to save on cost. firebase charges per
document request so this will be better than pulling averages from individual users.

if I want to display other peoples comments or that sort of thing then i will pull
from their user objects... this type of information will not be kept in the global 
averages file.