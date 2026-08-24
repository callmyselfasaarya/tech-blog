require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Article = require('./models/Article');
const Category = require('./models/Category');
const Subscriber = require('./models/Subscriber');
const Media = require('./models/Media');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techniccal-blog';

const SEED_USERS = [
  {
    name: 'Elena Rostova',
    email: 'superadmin@techniccal.com',
    password: 'SuperAdminPass2026!',
    role: 'SUPER_ADMIN',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    membershipStatus: 'insider',
    isVerified: true,
    emailVerified: true
  },
  {
    name: 'Julian Vance',
    email: 'admin@techniccal.com',
    password: 'AdminPass2026!',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    membershipStatus: 'pro',
    isVerified: true,
    emailVerified: true
  },
  {
    name: 'Marcus Sterling',
    email: 'editor@techniccal.com',
    password: 'EditorPass2026!',
    role: 'EDITOR',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    membershipStatus: 'pro',
    isVerified: true,
    emailVerified: true
  },
  {
    name: 'Sophia Thorne',
    email: 'member@techniccal.com',
    password: 'MemberPass2026!',
    role: 'MEMBER',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    membershipStatus: 'pro',
    savedArticles: ['designing-high-throughput-distributed-systems', 'llm-reasoning-engines-agentic-workflows'],
    isVerified: true,
    emailVerified: true
  },
  {
    name: 'David Miller',
    email: 'reader@techniccal.com',
    password: 'ReaderPass2026!',
    role: 'READER',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    membershipStatus: 'free',
    isVerified: true,
    emailVerified: true
  }
];

const SEED_CATEGORIES = [
  { name: 'SOFTWARE ARCHITECTURE', slug: 'software-architecture', description: 'System patterns, microservices, and distributed architecture.', count: 2 },
  { name: 'AI & MACHINE LEARNING', slug: 'ai-machine-learning', description: 'LLM reasoning engines, vector databases, and AI agent systems.', count: 2 },
  { name: 'SYSTEMS DESIGN', slug: 'systems-design', description: 'Low-latency protocols, concurrency models, and performance tuning.', count: 1 },
  { name: 'DEVELOPER TOOLS', slug: 'developer-tools', description: 'Compilers, Rust, Go, and developer workflow tooling.', count: 1 },
  { name: 'CAREER', slug: 'career', description: 'Actionable insights on tech leadership and system design interview prep.', count: 1 },
  { name: 'PROJECTS', slug: 'projects', description: 'Step-by-step technical guides and hands-on system blueprints.', count: 1 }
];

const SEED_ARTICLES = [
  {
    title: 'Designing High-Throughput Distributed Systems at Scale',
    slug: 'designing-high-throughput-distributed-systems',
    excerpt: 'A deep-dive into event-driven patterns, backpressure strategies, and partitioning techniques for scaling modern data pipelines.',
    category: 'SOFTWARE ARCHITECTURE',
    tags: ['Distributed Systems', 'Kafka', 'Architecture', 'Performance'],
    publishedAt: '2026-08-23',
    readingTime: '8 min read',
    featured: true,
    pinned: true,
    status: 'published',
    views: 8420,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Principal Systems Architect specializing in distributed storage and high-frequency stream processing.',
      role: 'Principal Systems Architect'
    },
    content: `
## The Foundations of Scalable Systems

As application workloads scale into millions of events per second, monolithic request-response models break down under network latency and concurrency bottlenecks. Building resilient infrastructure requires shifting toward decoupled, event-driven architectures.

### 1. Partitioning and Sharding Strategies
Consistent hashing allows systems to distribute data evenly across cluster nodes while minimizing rebalancing costs when nodes join or fail.

\`\`\`typescript
interface ClusterNode {
  id: string;
  hashRange: [number, number];
  status: 'HEALTHY' | 'REBALANCING' | 'OFFLINE';
}

function assignKeyToNode(key: string, nodes: ClusterNode[]): ClusterNode {
  const hash = computeMurmur3(key);
  return nodes.find(n => hash >= n.hashRange[0] && hash <= n.hashRange[1]) || nodes[0];
}
\`\`\`

> "System design is not about avoiding failure; it's about designing architectures where failure is an expected, non-fatal event."
`
  },
  {
    title: 'Understanding LLM Reasoning Engines & Agentic Workflows',
    slug: 'llm-reasoning-engines-agentic-workflows',
    excerpt: 'How modern AI architectures are moving from simple text generation to multi-step autonomous planning, tool usage, and reflection loops.',
    category: 'AI & MACHINE LEARNING',
    tags: ['AI', 'LLM', 'Agentic Workflows', 'Machine Learning'],
    publishedAt: '2026-08-21',
    readingTime: '6 min read',
    featured: true,
    pinned: false,
    status: 'published',
    views: 6710,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Dr. Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      bio: 'AI Research Engineer focused on autonomous agent frameworks and LLM evaluation architectures.',
      role: 'AI Research Lead'
    },
    content: `
## Beyond Simple Text Completion

The paradigm shift in artificial intelligence is moving from passive text generation to active reasoning engines. Agentic systems execute complex workflows by dynamically selecting tools, reflecting on intermediate outputs, and correcting errors in real time.

### The ReAct Pattern (Reasoning + Acting)
1. **Thought**: The model evaluates current context and determines the next sub-goal.
2. **Action**: The agent calls an external API, executes a database query, or runs code.
3. **Observation**: The system parses the tool return payload and updates memory.

\`\`\`python
class AgentLoop:
    def run(self, user_prompt: str):
        context = [user_prompt]
        while not self.is_completed():
            thought = self.reason(context)
            action = self.select_tool(thought)
            result = action.execute()
            context.append(result)
        return self.synthesize_answer(context)
\`\`\`
`
  },
  {
    title: 'Cracking the Senior System Design Interview: A Principal Engineer Guide',
    slug: 'cracking-senior-system-design-interview',
    excerpt: 'A comprehensive playbook for navigating distributed systems interviews, back-of-the-envelope calculations, and architectural tradeoffs.',
    category: 'CAREER',
    tags: ['Career', 'System Design', 'Interviews', 'Leadership'],
    publishedAt: '2026-08-20',
    readingTime: '10 min read',
    featured: false,
    pinned: false,
    status: 'published',
    views: 9240,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
    author: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Principal Systems Architect specializing in distributed storage and high-frequency stream processing.',
      role: 'Principal Systems Architect'
    },
    content: `
## Navigating High-Stakes Architecture Interviews

Senior and Principal engineering interviews evaluate your ability to make structured trade-offs under uncertainty. Interviewers don't just want a working diagram; they assess your depth in fault tolerance, data replication, and scaling bottlenecks.
`
  }
];

const SEED_SUBSCRIBERS = [
  { email: 'architect@techcorp.com', status: 'active' },
  { email: 'lead.dev@cloudlab.io', status: 'active' },
  { email: 'ai.researcher@lab.org', status: 'active' }
];

async function seedDatabase() {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('[Seed] Connected. Clearing existing collections...');

    await User.deleteMany({});
    await Article.deleteMany({});
    await Category.deleteMany({});
    await Subscriber.deleteMany({});
    await Media.deleteMany({});

    console.log('[Seed] Seeding Users...');
    for (const u of SEED_USERS) {
      const user = new User(u);
      await user.save();
    }
    console.log(`[Seed] Successfully seeded ${SEED_USERS.length} users.`);

    console.log('[Seed] Seeding Categories...');
    await Category.insertMany(SEED_CATEGORIES);
    console.log(`[Seed] Successfully seeded ${SEED_CATEGORIES.length} categories.`);

    console.log('[Seed] Seeding Articles...');
    await Article.insertMany(SEED_ARTICLES);
    console.log(`[Seed] Successfully seeded ${SEED_ARTICLES.length} articles.`);

    console.log('[Seed] Seeding Subscribers...');
    await Subscriber.insertMany(SEED_SUBSCRIBERS);
    console.log(`[Seed] Successfully seeded ${SEED_SUBSCRIBERS.length} subscribers.`);

    console.log('\n======================================================');
    console.log('  [Techniccal DB Seeding Completed Successfully]  ');
    console.log('======================================================');
    console.log('  Default Accounts Ready:');
    console.log('  - Super Admin : superadmin@techniccal.com / SuperAdminPass2026!');
    console.log('  - Admin       : admin@techniccal.com / AdminPass2026!');
    console.log('  - Editor      : editor@techniccal.com / EditorPass2026!');
    console.log('  - Member      : member@techniccal.com / MemberPass2026!');
    console.log('======================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
}

seedDatabase();
