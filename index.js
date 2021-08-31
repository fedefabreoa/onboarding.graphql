const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Hub {
    description: String
    title: String
    members: [Member]
    meetings: [Meeting]
    projects: [Project]
    courses: [Course]
    teams: [InternalTeam]
  }

  type Member {
    name: String
    internalTeam: InternalTeam
  }

  type InternalTeam {
    name: String
  }

  interface Content {
    title: String
    description: String
    date: String
  }
 
  type Meeting implements Content {
    title: String
    description: String
    date: String
    link: String
  }

  type Project implements Content {
    title: String
    description: String
    date: String
    link: String
    participants: [Member]
  }

  type Course implements Content {
    title: String
    description: String
    date: String
    recommendedBy: Member
  }

  type Query {
    hubs: [Hub]
    projects: [Project]
  }
`;

const team = { name: 'GraphQL' }

const members = [
  {
    name: 'Fede',
    internalTeam: team,
  },
  {
    name: 'Carlos',
    internalTeam: team,
  },
  {
    name: 'Alexis',
    internalTeam: team,
  },
]

const meetings = [
  {
    title: 'First work session',
    description: 'We met to discuss how to implement GraphQL',
    date: '17:30:15+05:30',
    link: 'http://google.com'
  },
  {
    title: 'First work session',
    description: 'We met to discuss how to implement GraphQL',
    date: '17:30:15+05:30',
    link: 'http://google.com'
  }
]

const projects = [
  {
    title: 'Onboarding app',
    description: 'A simple way to join and follow hubs activities',
    date: '17:30:15+05:30',
    link: 'http://google.com'
  },
  {
    title: 'Onboarding app',
    description: 'A simple way to join and follow hubs activities',
    date: '17:30:15+05:30',
    link: 'http://google.com'
  },
]

const courses = [
  {
    title: 'Apollo GraphQL',
    description: 'Recommended GraphQL server ',
    date: '17:30:15+05:30',
    link: 'http://google.com'
  }
]

const hubs = [
  {
    title: 'Software Engineering',
    description: 'The best hub',
    members: members,
    meetings: meetings,
    projects: projects,
    courses: courses,
    teams: [team]
  },
];

const resolvers = {
  Query: {
    hubs: () => hubs,
    projects: () => projects
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});