import { Template } from '@/types';

export const templates: Template[] = [
    {
        id: 'saas-landing',
        name: 'SaaS Landing Page',
        description: 'Modern high-converting landing page with hero, features, pricing, and social proof.',
        category: 'Marketing',
        schema: {
            id: 'saas-landing',
            name: 'SaaS Landing',
            description: 'A dark-themed SaaS landing page',
            components: [
                {
                    id: 'hero',
                    type: 'Header',
                    props: {
                        title: 'Build Faster with AI',
                        subtitle: 'Turn your ideas into production-ready code in seconds. No coding required.',
                    },
                    layout: { x: 0, y: 0, width: 12, height: 2 }
                },
                {
                    id: 'feature-1',
                    type: 'Card',
                    props: {
                        title: 'Instant Generation',
                        description: 'Describe what you want and see it appear instantly with our advanced AI engine.',
                        icon: 'Zap',
                        trend: '100x Faster'
                    },
                    layout: { x: 0, y: 2, width: 4, height: 3 }
                },
                {
                    id: 'feature-2',
                    type: 'Card',
                    props: {
                        title: 'Production Code',
                        description: 'Get clean, maintainable React & Tailwind code that you can use immediately.',
                        icon: 'Code',
                        trend: 'TypeScript'
                    },
                    layout: { x: 4, y: 2, width: 4, height: 3 }
                },
                {
                    id: 'feature-3',
                    type: 'Card',
                    props: {
                        title: 'Pixel Perfect',
                        description: 'Beautiful, responsive designs that look great on every device.',
                        icon: 'Smartphone',
                        trend: 'Responsive'
                    },
                    layout: { x: 8, y: 2, width: 4, height: 3 }
                },
                {
                    id: 'pricing-1',
                    type: 'Card',
                    props: {
                        title: 'Starter',
                        value: '$0',
                        description: 'Perfect for hobbyists',
                        action: 'Get Started',
                        icon: 'Star'
                    },
                    layout: { x: 1, y: 5, width: 3, height: 4 }
                },
                {
                    id: 'pricing-2',
                    type: 'Card',
                    props: {
                        title: 'Pro',
                        value: '$29',
                        description: 'For serious builders',
                        action: 'Upgrade Now',
                        trend: 'Most Popular',
                        icon: 'Zap'
                    },
                    layout: { x: 4, y: 5, width: 4, height: 4 }
                },
                {
                    id: 'pricing-3',
                    type: 'Card',
                    props: {
                        title: 'Enterprise',
                        value: 'Custom',
                        description: 'For large teams',
                        action: 'Contact Us',
                        icon: 'Briefcase'
                    },
                    layout: { x: 8, y: 5, width: 3, height: 4 }
                },
                {
                    id: 'testimonials',
                    type: 'Table',
                    props: {
                        title: 'Trusted by Developers',
                        columns: ['User', 'Role', 'Feedback', 'Rating'],
                        data: [
                            { id: 1, user: 'Sarah Chen', role: 'CTO @ TechFlow', feedback: 'Changed how we build UI forever.', rating: '⭐️⭐️⭐️⭐️⭐️' },
                            { id: 2, user: 'Mike Ross', role: 'Freelancer', feedback: 'Incredible speed and quality.', rating: '⭐️⭐️⭐️⭐️⭐️' },
                            { id: 3, user: 'Alex Kim', role: 'Product Manager', feedback: 'My team loves using this.', rating: '⭐️⭐️⭐️⭐️⭐️' }
                        ]
                    },
                    layout: { x: 0, y: 9, width: 12, height: 5 }
                }
            ],
            theme: 'dark',
            responsive: true
        }
    },
    {
        id: 'crm-dashboard',
        name: 'CRM Dashboard',
        description: 'Comprehensive sales dashboard with pipeline metrics, recent deals, and activity tracking.',
        category: 'Dashboard',
        schema: {
            id: 'crm-dashboard',
            name: 'Sales CRM',
            description: 'Sales pipeline and customer management',
            components: [
                {
                    id: 'header',
                    type: 'Header',
                    props: {
                        title: 'Sales Overview',
                        subtitle: 'Q4 Performance Pipeline',
                    },
                    layout: { x: 0, y: 0, width: 12, height: 1 }
                },
                {
                    id: 'stat-revenue',
                    type: 'Card',
                    props: {
                        title: 'Total Revenue',
                        value: '$245,000',
                        trend: '+12% vs last month',
                        icon: 'DollarSign'
                    },
                    layout: { x: 0, y: 1, width: 3, height: 2 }
                },
                {
                    id: 'stat-deals',
                    type: 'Card',
                    props: {
                        title: 'Active Deals',
                        value: '45',
                        trend: '+5 new this week',
                        icon: 'Briefcase'
                    },
                    layout: { x: 3, y: 1, width: 3, height: 2 }
                },
                {
                    id: 'stat-conversion',
                    type: 'Card',
                    props: {
                        title: 'Win Rate',
                        value: '68%',
                        trend: '+2.4% success',
                        icon: 'TrendingUp'
                    },
                    layout: { x: 6, y: 1, width: 3, height: 2 }
                },
                {
                    id: 'stat-meetings',
                    type: 'Card',
                    props: {
                        title: 'Scheduled Calls',
                        value: '12',
                        trend: 'Next: 2:00 PM',
                        icon: 'Video'
                    },
                    layout: { x: 9, y: 1, width: 3, height: 2 }
                },
                {
                    id: 'chart-pipeline',
                    type: 'Chart',
                    props: {
                        title: 'Pipeline Stages',
                        chartType: 'bar',
                        data: [
                            { name: 'Lead', value: 120 },
                            { name: 'Qualified', value: 80 },
                            { name: 'Proposal', value: 45 },
                            { name: 'Negotiation', value: 20 },
                            { name: 'Closed', value: 15 }
                        ]
                    },
                    layout: { x: 0, y: 3, width: 8, height: 5 }
                },
                {
                    id: 'activity-feed',
                    type: 'Table',
                    props: {
                        title: 'Recent Activity',
                        columns: ['Agent', 'Action', 'Time'],
                        data: [
                            { id: 1, agent: 'Sarah', action: 'Called Acme Corp', time: '2m ago' },
                            { id: 2, agent: 'Mike', action: 'Email sent to John', time: '15m ago' },
                            { id: 3, agent: 'System', action: 'Lead #402 Created', time: '1h ago' },
                            { id: 4, agent: 'Sarah', action: 'Closed Deal #301', time: '2h ago' },
                            { id: 5, agent: 'Tom', action: 'Meeting with Beta', time: '4h ago' }
                        ]
                    },
                    layout: { x: 8, y: 3, width: 4, height: 5 }
                },
                {
                    id: 'contacts',
                    type: 'Table',
                    props: {
                        title: 'Recent Contacts',
                        searchable: true,
                        columns: ['Name', 'Company', 'Status', 'Value'],
                        data: [
                            { id: 1, name: 'Alice Smith', company: 'TechStar', status: 'Negotiation', value: '$12,000' },
                            { id: 2, name: 'Bob Jones', company: 'GlobalInc', status: 'Qualified', value: '$8,500' },
                            { id: 3, name: 'Carol White', company: 'SmallBiz', status: 'Lead', value: '$2,000' }
                        ]
                    },
                    layout: { x: 0, y: 8, width: 12, height: 4 }
                }
            ],
            theme: 'dark',
            responsive: true
        }
    },
    {
        id: 'ai-chat',
        name: 'AI Chat Interface',
        description: 'Modern messaging interface with history, rich message bubbles, and input area.',
        category: 'Chat',
        schema: {
            id: 'ai-chat',
            name: 'AI Assistant',
            description: 'Conversational interface',
            components: [
                {
                    id: 'sidebar',
                    type: 'Table',
                    props: {
                        title: 'Chats',
                        columns: ['History'],
                        data: [
                            { id: 1, history: 'Project Ideas' },
                            { id: 2, history: 'Code Refactoring' },
                            { id: 3, history: 'UI Design Tips' },
                            { id: 4, history: 'Weekly Planner' }
                        ]
                    },
                    layout: { x: 0, y: 0, width: 3, height: 12 }
                },
                {
                    id: 'header',
                    type: 'Header',
                    props: {
                        title: 'GPT-4 Assistant',
                        subtitle: 'Online • Fast Mode',
                    },
                    layout: { x: 3, y: 0, width: 9, height: 1 }
                },
                {
                    id: 'message-1',
                    type: 'Card',
                    props: {
                        title: 'User',
                        description: 'Can you help me design a dashboard for my startup?',
                        icon: 'User'
                    },
                    layout: { x: 4, y: 2, width: 7, height: 2 }
                },
                {
                    id: 'message-2',
                    type: 'Card',
                    props: {
                        title: 'AI Assistant',
                        description: 'I can certainly help with that! A startup dashboard typically needs key metrics like revenue, users, and growth charts.',
                        icon: 'Bot',
                        trend: 'AI Generated'
                    },
                    layout: { x: 3, y: 4, width: 8, height: 3 }
                },
                {
                    id: 'message-3',
                    type: 'Card',
                    props: {
                        title: 'User',
                        description: 'That sounds perfect. What about color schemes?',
                        icon: 'User'
                    },
                    layout: { x: 4, y: 7, width: 7, height: 2 }
                },
                {
                    id: 'input-area',
                    type: 'Form',
                    props: {
                        title: '',
                        fields: [
                            { name: 'message', label: '', type: 'text', placeholder: 'Type your message here...' }
                        ],
                        submitText: 'Send'
                    },
                    layout: { x: 3, y: 10, width: 9, height: 2 }
                }
            ],
            theme: 'dark',
            responsive: true
        }
    },
    {
        id: 'crypto-dashboard',
        name: 'Crypto Portfolio',
        description: 'Cryptocurrency banking dashboard with wallet, transfer, and market trends.',
        category: 'Finance',
        schema: {
            id: 'crypto-dashboard',
            name: 'Crypto Web3',
            description: 'Web3 portfolio manager',
            components: [
                {
                    id: 'header',
                    type: 'Header',
                    props: {
                        title: 'My Wallet',
                        subtitle: '0x1234...5678',
                    },
                    layout: { x: 0, y: 0, width: 12, height: 1 }
                },
                {
                    id: 'balance',
                    type: 'Card',
                    props: {
                        title: 'Total Balance',
                        value: '$42,593.00',
                        trend: '+4.5%',
                        icon: 'Wallet'
                    },
                    layout: { x: 0, y: 1, width: 4, height: 2 }
                },
                {
                    id: 'asset-btc',
                    type: 'Card',
                    props: {
                        title: 'Bitcoin',
                        value: '$28,400',
                        trend: '+1.2%',
                        icon: 'TrendingUp'
                    },
                    layout: { x: 4, y: 1, width: 4, height: 2 }
                },
                {
                    id: 'asset-eth',
                    type: 'Card',
                    props: {
                        title: 'Ethereum',
                        value: '$1,850',
                        trend: '-0.5%',
                        icon: 'Activity'
                    },
                    layout: { x: 8, y: 1, width: 4, height: 2 }
                },
                {
                    id: 'chart-portfolio',
                    type: 'Chart',
                    props: {
                        title: 'Portfolio Performance',
                        chartType: 'line',
                        data: [
                            { name: 'Jan', value: 30000 },
                            { name: 'Feb', value: 35000 },
                            { name: 'Mar', value: 32000 },
                            { name: 'Apr', value: 42000 },
                            { name: 'May', value: 45000 }
                        ]
                    },
                    layout: { x: 0, y: 3, width: 8, height: 5 }
                },
                {
                    id: 'transfer',
                    type: 'Form',
                    props: {
                        title: 'Quick Transfer',
                        fields: [
                            { name: 'address', label: 'Address', type: 'text' },
                            { name: 'amount', label: 'Amount (ETH)', type: 'number' }
                        ],
                        submitText: 'Send Now'
                    },
                    layout: { x: 8, y: 3, width: 4, height: 5 }
                }
            ],
            theme: 'dark',
            responsive: true
        }
    }
];
