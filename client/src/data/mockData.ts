import { Article, Category, NewsletterIssue, Subscriber, User, MediaItem } from '../types';

export const INITIAL_AUTHOR = {
  name: "Techniccal Editorial Team",
  avatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80",
  bio: "Engineering research and technical analysis publication exploring software architecture, AI systems, and cloud engineering.",
  role: "Techniccal Editorial Desk"
};

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Software Architecture', slug: 'software-architecture', description: 'System patterns, microservices, and distributed architecture.', count: 4 },
  { id: '2', name: 'AI & Machine Learning', slug: 'ai-machine-learning', description: 'LLM reasoning engines, vector databases, and AI agent systems.', count: 3 },
  { id: '3', name: 'Systems Design', slug: 'systems-design', description: 'Low-latency protocols, concurrency models, and performance tuning.', count: 3 },
  { id: '4', name: 'Cloud Infrastructure', slug: 'cloud-infrastructure', description: 'Kubernetes, serverless, CI/CD, and DevOps automation.', count: 2 },
  { id: '5', name: 'Developer Tools', slug: 'developer-tools', description: 'Compilers, Rust, Go, and developer workflow tooling.', count: 2 },
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-pinned-01',
    title: 'Designing High-Throughput Distributed Systems at Scale',
    slug: 'designing-high-throughput-distributed-systems',
    excerpt: 'A deep-dive into event-driven patterns, backpressure strategies, and partitioning techniques for scaling modern data pipelines.',
    category: 'Software Architecture',
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
    seo: {
      title: 'Designing High-Throughput Distributed Systems — Techniccal',
      description: 'A deep-dive into event-driven patterns, backpressure strategies, and partitioning techniques for scaling modern data pipelines.',
      keywords: ['distributed systems', 'architecture', 'kafka', 'scalability']
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

> "System design is not about avoiding failure; it's about designing architectures where failure is a expected, non-fatal event."

### 2. Handling Backpressure in Stream Pipelines
When producers publish data faster than consumers can process it, unbuffered memory allocation leads to Out-Of-Memory (OOM) crashes. Implementing reactive stream backpressure ensures consumers signal capacity before receiving payloads.
`
  },
  {
    id: 'art-01',
    title: 'Understanding LLM Reasoning Engines & Agentic Workflows',
    slug: 'llm-reasoning-engines-agentic-workflows',
    excerpt: 'How modern AI architectures are moving from simple text generation to multi-step autonomous planning, tool usage, and reflection loops.',
    category: 'AI & Machine Learning',
    tags: ['AI', 'LLM', 'Agentic Workflows', 'Machine Learning'],
    publishedAt: '2026-08-21',
    readingTime: '6 min read',
    featured: false,
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
    seo: {
      title: 'Understanding LLM Reasoning Engines & Agentic Workflows — Techniccal',
      description: 'How modern AI architectures are moving from simple text generation to multi-step autonomous planning, tool usage, and reflection loops.',
      keywords: ['AI', 'agents', 'LLM', 'reasoning']
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
    id: 'art-02',
    title: 'The Engineering Behind Low-Latency Real-Time Streaming',
    slug: 'engineering-low-latency-real-time-streaming',
    excerpt: 'An architectural analysis of zero-copy buffer allocations, ring buffers, and WebSockets vs gRPC for sub-10ms event delivery.',
    category: 'Systems Design',
    tags: ['Low Latency', 'Networking', 'gRPC', 'Performance'],
    publishedAt: '2026-08-19',
    readingTime: '5 min read',
    featured: false,
    pinned: false,
    status: 'published',
    views: 5120,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    author: INITIAL_AUTHOR,
    content: `
## Eliminating Microsecond Bottlenecks

In financial trading engines, real-time analytics, and gaming backends, latency is measured in microseconds. Achieving consistent sub-10ms tail latencies requires optimizing data structures, transport protocols, and memory allocation strategies.

### Protocol Comparison: WebSockets vs gRPC Stream
- **gRPC (HTTP/2 Multiplexing)**: Binary Protobuf serialization reduces payload sizes by up to 60% compared to JSON over WebSockets.
- **Ring Buffers (Disruptor Pattern)**: Lock-free ring buffers eliminate thread contention on shared memory queues.
`
  },
  {
    id: 'art-03',
    title: 'Kubernetes vs Serverless: Cost & Performance Tradeoffs in 2026',
    slug: 'kubernetes-vs-serverless-tradeoffs-2026',
    excerpt: 'Comparing cold start latencies, egress network costs, and developer velocity across container orchestration and cloud functions.',
    category: 'Cloud Infrastructure',
    tags: ['Kubernetes', 'Serverless', 'DevOps', 'Cloud'],
    publishedAt: '2026-08-16',
    readingTime: '6 min read',
    featured: false,
    pinned: false,
    status: 'published',
    views: 4890,
    coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    author: INITIAL_AUTHOR,
    content: `
## Navigating Cloud Infrastructure Choices

Deciding between Kubernetes (EKS/GKE) and Serverless (AWS Lambda/Cloud Run) is no longer an all-or-nothing choice. Modern production setups often leverage hybrid infrastructure models.

### Key Factors to Evaluate
1. **Traffic Predictability**: Steady-state workloads favor Kubernetes reserved instances for cost efficiency.
2. **Cold Start Budget**: Latency-sensitive APIs require provisioned concurrency or lightweight WebAssembly (Wasm) runtimes.
`
  },
  {
    id: 'art-04',
    title: 'Why Rust and Go Dominate Modern Infrastructure Systems',
    slug: 'why-rust-and-go-dominate-infrastructure',
    excerpt: 'Examining memory safety, garbage collection pauses, compilation speeds, and why cloud-native tooling is built almost exclusively in Go and Rust.',
    category: 'Developer Tools',
    tags: ['Rust', 'Golang', 'Infrastructure', 'Compilers'],
    publishedAt: '2026-08-12',
    readingTime: '5 min read',
    featured: false,
    pinned: false,
    status: 'published',
    views: 4210,
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
    author: INITIAL_AUTHOR,
    content: `
## Language Choices in Systems Programming

From Docker and Kubernetes (written in Go) to Envoy, TiKV, and Cloudflare workers (written in Rust), modern infrastructure codebases have migrated away from legacy C/C++.

### Go: Goroutines and Simplicity
Go's lightweight CSP concurrency model and fast compilation speed make it the ideal language for network servers and microservices.

### Rust: Ownership and Zero-Cost Abstractions
Rust provides memory safety without garbage collection overhead, enabling sub-millisecond execution predictability for storage engines and network proxies.
`
  },
    
  {
    id: 'art-05',
    title: 'Building Resilient Event-Driven Architectures with Kafka',
    slug: 'resilient-event-driven-architectures-kafka',
    excerpt: 'Best practices for consumer group offsets, idempotent producers, dead letter queues, and schema evolution in production.',
    category: 'Programming',
    tags: ['Kafka', 'Event Driven', 'Architecture'],
    publishedAt: '2026-08-08',
    updatedAt: '2026-08-24',
    readingTime: '7 min read',
    featured: false,
    pinned: false,
    status: 'published',
    views: 3950,
    coverImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80',
    author: INITIAL_AUTHOR,
    content: `
## Event-Driven Resilience in Microservices

Building event-driven microservices requires explicit error handling strategies for schema changes, consumer crashes, and network partitions.

### 1. Core Production Rules
- Enable idempotent producer configs (\`enable.idempotence=true\`).
- Enforce strict schema validation using Schema Registry.
- Route malformed events to a dedicated Dead Letter Queue (DLQ).

\`\`\`typescript
// Idempotent Kafka Producer Configuration
const producer = kafka.producer({
  maxInFlightRequests: 1,
  idempotent: true,
  transactionalId: 'orders-tx-processor-01'
});
\`\`\`

> "In event-driven architectures, state is not fixed; state is a continuous fold over stream events."

![Architecture Diagram](https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80)
`
  },
  {
    id: 'art-06',
    title: 'Cracking the Senior System Design Interview: A Principal Engineer Guide',
    slug: 'cracking-senior-system-design-interview',
    excerpt: 'A comprehensive playbook for navigating distributed systems interviews, back-of-the-envelope calculations, and architectural tradeoffs.',
    category: 'Career',
    tags: ['Career', 'System Design', 'Interviews', 'Leadership'],
    publishedAt: '2026-08-20',
    updatedAt: '2026-08-22',
    readingTime: '10 min read',
    featured: true,
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
    seo: {
      title: 'Cracking the Senior System Design Interview — Techniccal',
      description: 'A comprehensive playbook for navigating distributed systems interviews, back-of-the-envelope calculations, and architectural tradeoffs.',
      keywords: ['career', 'jobs', 'interviews', 'system design']
    },
    content: `
## Navigating High-Stakes Architecture Interviews

Senior and Principal engineering interviews evaluate your ability to make structured trade-offs under uncertainty. Interviewers don't just want a working diagram; they assess your depth in fault tolerance, data replication, and scaling bottlenecks.

### 1. The 4-Step System Design Framework
1. **Requirements Clarification**: Establish QPS, storage retention, read/write ratio, and SLA constraints.
2. **Back-of-the-Envelope Estimation**: Calculate throughput, bandwidth, and memory storage needs.
3. **High-Level Architecture**: Sketch API gateways, load balancers, database storage tiers, and caching layers.
4. **Deep-Dive Bottlenecks**: Address network partitioning (CAP theorem), cache invalidation, and single points of failure.

\`\`\`python
# Back-of-the-envelope calculation helper for QPS & Bandwidth
def calculate_system_metrics(daily_active_users=10_000_000, requests_per_user=20, payload_kb=50):
    total_daily_requests = daily_active_users * requests_per_user
    avg_qps = total_daily_requests / 86400
    peak_qps = avg_qps * 2.5
    bandwidth_mb_sec = (peak_qps * payload_kb) / 1024
    return {"avg_qps": round(avg_qps), "peak_qps": round(peak_qps), "bandwidth_mb_sec": round(bandwidth_mb_sec, 2)}
\`\`\`

> "Great architects do not pick the best technology; they choose the set of drawbacks they are willing to live with."

![System Design Whiteboard](https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80)
`
  },
  {
    id: 'art-07',
    title: 'Building a High-Performance Rust In-Memory Key-Value Store',
    slug: 'building-rust-in-memory-key-value-store',
    excerpt: 'Step-by-step project tutorial on implementing a concurrent RESP-compatible key-value engine using Rust and Tokio.',
    category: 'Projects',
    tags: ['Rust', 'Projects', 'Tutorial', 'Database'],
    publishedAt: '2026-08-18',
    updatedAt: '2026-08-23',
    readingTime: '12 min read',
    featured: true,
    pinned: false,
    status: 'published',
    views: 7410,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    author: INITIAL_AUTHOR,
    seo: {
      title: 'Building a High-Performance Rust Key-Value Store — Techniccal',
      description: 'Step-by-step project tutorial on implementing a concurrent RESP-compatible key-value engine using Rust and Tokio.',
      keywords: ['rust', 'project tutorial', 'database', 'tokio']
    },
    content: `
## Project Walkthrough: Building an In-Memory Store

In this hands-on tutorial, we will build a lock-free, concurrent key-value storage engine in Rust that implements a subset of the Redis RESP protocol.

### 1. Project Initialization & Dependencies

Add the following Tokio runtime dependencies to your \`Cargo.toml\`:

\`\`\`toml
[dependencies]
tokio = { version = "1.35", features = ["full"] }
bytes = "1.5"
dashmap = "5.5"
\`\`\`

### 2. Implementing the Concurrent Storage Engine

Using DashMap for lock-free sharded hash map storage:

\`\`\`rust
use dashmap::DashMap;
use std::sync::Arc;

#[derive(Clone)]
pub struct DbStore {
    entries: Arc<DashMap<String, Vec<u8>>>,
}

impl DbStore {
    pub fn new() -> Self {
        DbStore {
            entries: Arc::new(DashMap::new()),
        }
    }

    pub fn set(&self, key: String, value: Vec<u8>) {
        self.entries.insert(key, value);
    }

    pub fn get(&self, key: &str) -> Option<Vec<u8>> {
        self.entries.get(key).map(|v| v.value().clone())
    }
}
\`\`\`

> "Writing your own database storage engine is the fastest path to mastering concurrency and memory layout."

![Rust Server Benchmarks](https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80)
`
  }
];

export const INITIAL_ISSUES: NewsletterIssue[] = [
  { id: '1', issueNumber: 'Dispatch #048', title: 'The Future of Distributed Databases', publishedAt: '2026-08-18', excerpt: 'Deep dive into Spanner, CockroachDB, and multi-region consensus algorithms.', readTime: '5 min' },
  { id: '2', issueNumber: 'Dispatch #047', title: 'Benchmarking AI Inference Runtimes', publishedAt: '2026-08-11', excerpt: 'Comparing vLLM, TensorRT-LLM, and Ollama throughput under concurrency.', readTime: '6 min' },
  { id: '3', issueNumber: 'Dispatch #046', title: 'Zero-Trust Cloud Network Security', publishedAt: '2026-08-04', excerpt: 'Implementing eBPF-based network policies in Kubernetes with Cilium.', readTime: '4 min' },
];
export const INITIAL_NEWSLETTER_ISSUES = INITIAL_ISSUES;

export const INITIAL_SUBSCRIBERS: Subscriber[] = [
  { id: 'sub-1', email: 'architect@techcorp.com', subscribedAt: '2026-08-01', status: 'active', source: 'Homepage' },
  { id: 'sub-2', email: 'lead.dev@cloudlab.io', subscribedAt: '2026-08-05', status: 'active', source: 'Sidebar' },
  { id: 'sub-3', email: 'ai.researcher@lab.org', subscribedAt: '2026-08-12', status: 'active', source: 'Article Footer' }
];

export const INITIAL_MEDIA: MediaItem[] = [
  { id: 'med-1', filename: 'distributed-systems.jpg', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', mimeType: 'image/jpeg', size: 1468006, uploadedAt: '2026-08-23' },
  { id: 'med-2', filename: 'ai-architecture.jpg', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', mimeType: 'image/jpeg', size: 2202009, uploadedAt: '2026-08-21' },
];

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-super-1',
    name: 'Elena Rostova',
    email: 'superadmin@techniccal.com',
    role: 'SUPER_ADMIN',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-01-10'
  },
  {
    id: 'usr-admin-1',
    name: 'Julian Vance',
    email: 'admin@techniccal.com',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-02-14'
  },
  {
    id: 'usr-editor-1',
    name: 'Marcus Sterling',
    email: 'editor@techniccal.com',
    role: 'EDITOR',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    createdAt: '2026-03-01'
  },
  {
    id: 'usr-member-1',
    name: 'Sophia Thorne',
    email: 'member@techniccal.com',
    role: 'MEMBER',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    membershipStatus: 'pro',
    savedArticles: ['art-pinned-01', 'art-01'],
    createdAt: '2026-04-12'
  },
  {
    id: 'usr-reader-1',
    name: 'David Miller',
    email: 'reader@techniccal.com',
    role: 'READER',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    membershipStatus: 'free',
    createdAt: '2026-05-20'
  }
];

export const INITIAL_USER: User = INITIAL_USERS[0];
export const MOCK_USER = INITIAL_USER;
