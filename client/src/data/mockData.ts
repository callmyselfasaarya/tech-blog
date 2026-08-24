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
    category: 'Software Architecture',
    tags: ['Kafka', 'Event Driven', 'Architecture'],
    publishedAt: '2026-08-08',
    readingTime: '7 min read',
    featured: false,
    pinned: false,
    status: 'published',
    views: 3950,
    coverImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=800&q=80',
    author: INITIAL_AUTHOR,
    content: `
## Event-Driven Resilience

Building event-driven microservices requires explicit error handling strategies for schema changes, consumer crashes, and network partitions.

### Core Production Rules
- Enable idempotent producer configs (\`enable.idempotence=true\`).
- Enforce strict schema validation using Schema Registry.
- Route malformed events to a dedicated Dead Letter Queue (DLQ).
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
  { id: 'med-1', name: 'distributed-systems.jpg', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80', size: '1.4 MB', uploadedAt: '2026-08-23' },
  { id: 'med-2', name: 'ai-architecture.jpg', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80', size: '2.1 MB', uploadedAt: '2026-08-21' },
];

export const INITIAL_USER: User = {
  id: 'usr-1',
  name: 'Techniccal Admin',
  email: 'editor@techniccal.com',
  role: 'admin',
  avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=300&q=80'
};
export const MOCK_USER = INITIAL_USER;
