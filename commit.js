import moment from 'moment';
import simpleGit from 'simple-git';
import random from 'random';

const git = simpleGit();

// Set the date range for your commits (e.g., from January 1, 2023, to today)
const startDate = moment("2023-01-01"); 
const endDate = moment();

// Function to generate random commits within a date range
async function makeCommits() {
   for (let i = 0; i < 100; i++) {
      const randomDate = moment(startDate).add(random.int(0, endDate.diff(startDate, 'days')), 'days');
      const commitMessage = `Commit #${i + 1} on ${randomDate.format('YYYY-MM-DD')}`;
      
      // Make a dummy commit on the generated random date
      await makeCommit(commitMessage, randomDate);
   }
}

// Function to create a commit on a specific date
async function makeCommit(message, date) {
   try {
      const dateString = date.format('YYYY-MM-DD HH:mm:ss');
      // Setting the commit date
      process.env.GIT_AUTHOR_DATE = dateString;
      process.env.GIT_COMMITTER_DATE = dateString;

      // Commit to GitHub repository
      await git.commit(message);

      console.log(`Commit made: ${message} at ${dateString}`);
   } catch (err) {
      console.error('Error during commit:', err);
   }
}

// Call the makeCommits function to start making the commits
makeCommits().catch(console.error);
