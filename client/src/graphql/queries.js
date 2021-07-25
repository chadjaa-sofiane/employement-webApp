import { gql } from "@apollo/client";

export const GET_ALL_POSTS = gql`
  query getAll($title: String!, $filter: FilterInput!) {
    getAllPosts(title: $title, filter: $filter) {
      _id
      title
      body
      createdAt
      jobsNeeded {
        job
      }
    }
    getPostsCount(filter: $filter)
  }
`;

export const GET_ONE_POST = gql`
  query getPostById($id: ID!) {
    gePostById(id: $id) {
      _id
      title
      createdAt
      state
      body
      employer {
        firstName
        lastName
        email
        state
        jobFiled
        socialMedia {
          socialMedia
          link
        }
      }
      jobsNeeded {
        job
        description
        workTimeRange {
          start
          finish
        }
        workHours
        number
        salaryRange {
          currency
          amount
        }
      }
    }
  }
`;

export const GET_JOB_FIELD = gql`
  query getJobsField($jobField: JobFileds!) {
    getAllJobsField
    jobAccordingField(jobField: $jobField)
  }
`;
export const GET_JOBS = gql`
  query getJobs($jobField: String!) {
    getJobsByJobFieldName(jobField: $jobField)
  }
`;

export const GET_USER_BY_USER_NAME = gql`
  query getUserByName($userName: String!) {
    getUserByName(userName: $userName) {
      firstName
      lastName
      email
      userType
      jobFiled
      state
      socialMedia {
        link
        socialMedia
      }
      jobSekeer {
        type
        jobs
      }
    }
  }
`;

export const GET_MY_INFO = gql`
  query getMyInfo {
    getMyInfo {
      _id
      userType
      firstName
      lastName
      state
      jobFiled
    }
  }
`;

export const GET_ALL_STATES = gql`
  query {
    getAllStates
  }
`;

export const GET_MY_POSTS = gql`
  query getMyPosts {
    getMyPosts {
      _id
      title
      body
      createdAt
      jobsNeeded {
        job
      }
    }
  }
`;
