import { defineConfig, type DefaultTheme } from 'vitepress'

export const zh = defineConfig({
    lang: 'zh-Hans',
    description: 'go mongox 指南',
    themeConfig: {
        nav: [
            {text: '指南', link: '/getting-started/what-is-go-mongox'},
            {text: '贡献', link: '/contribute'},
        ],

        outline: {
            label: '页面导航',
            level: [2, 6]
        },

        sidebar: [
            {
                text: '入门指南',
                collapsed: true,
                items: [
                    {text: '简介', link: '/getting-started/what-is-go-mongox'},
                    {text: '文档模型', link: '/getting-started/model'},
                    {
                        text: '泛型的 Collection',
                        link: '/getting-started/generic-collection',
                    },
                ]
            },
            {
                text: 'CRUD 操作器',
                collapsed: true,
                items: [
                    {text: 'Creator 创建器', link: '/operator/creator'},
                    {text: 'Finder 查询器', link: '/operator/finder'},
                    {text: 'Updater 更新器', link: '/operator/updater'},
                    {text: 'Deleter 删除器', link: '/operator/deleter'},
                    {text: 'Aggregator 聚合器', link: '/operator/aggregator'},
                ]
            },
            {
                text: "BSON 构建",
                collapsed: true,
                items: [
                    {text: 'Bsonx 包：简化 BSON 数据的构建', link: '/build/bsonx'},
                    {
                        text: 'Query BSON 构建',
                        collapsed: true,
                        items: [
                            {text: 'Query 包', link: '/build/query/introduction'},
                            {
                                text: '比较操作符',
                                collapsed: true,
                                items: [
                                    {text: '$eq', link: '/build/query/comparison/eq'},
                                    {text: '$gt', link: '/build/query/comparison/gt'},
                                    {text: '$gte', link: '/build/query/comparison/gte'},
                                    {text: '$in', link: '/build/query/comparison/in'},
                                    {
                                        text: '更新中...',
                                    }
                                ]
                            },
                            {
                                text: '更新中...',
                            }
                        ]
                    },
                    {
                        text: 'Update BSON 构建',
                        collapsed: true,
                        items: [
                            {text: 'Update 包', link: '/build/update/introduction'},
                            {
                                text: "字段更新操作符",
                                collapsed: true,
                                items: [
                                    {text: "$currentDate", link: "/build/update/field/currentDate"}
                                ]
                            },
                            {
                                text: '更新中...',
                            }
                        ]
                    },
                    {
                        text: 'Aggregation BSON 构建',
                        collapsed: true,
                        items: [
                            {text: 'Aggregation 包', link: '/build/aggregation/introduction'},
                            {
                                text: 'Stage 阶段构建',
                                collapsed: true,
                                items: [
                                    {text: "stage 构建器",link: '/build/aggregation/stage/introduction'},
                                    {text: "$addFields",link: '/build/aggregation/stage/addFields'},
                                    {text: "$bucket",link: '/build/aggregation/stage/bucket'},
                                    {text: "$bucketAuto",link: '/build/aggregation/stage/bucketAuto'},
                                    {text: "$count",link: '/build/aggregation/stage/count'},
                                    {text: "$facet",link: '/build/aggregation/stage/facet'},
                                    {text: "$group",link: '/build/aggregation/stage/group'},
                                    {text: "$limit",link: '/build/aggregation/stage/limit'},
                                    {text: "$lookup",link: '/build/aggregation/stage/lookup'},
                                    {text: "$match",link: '/build/aggregation/stage/match'},
                                    {text: "$project",link: '/build/aggregation/stage/project'},
                                    {text: "$replaceWith",link: '/build/aggregation/stage/replaceWith'},
                                    {text: "$set",link: '/build/aggregation/stage/set'},
                                    {text: "$skip",link: '/build/aggregation/stage/skip'},
                                    {text: "$sort",link: '/build/aggregation/stage/sort'},
                                    {text: "$sortByCount",link: '/build/aggregation/stage/sortByCount'},
                                    {text: "$unwind",link: '/build/aggregation/stage/unwind'},
                                ]
                            },
                            {
                                text: "表达式构建",
                                collapsed: true,
                                items: [
                                    {text: "表达式构建器", link: "/build/aggregation/expression/introduction"},
                                    {
                                        text: "累加器表达式",
                                        collapsed: true,
                                        items: [
                                            {
                                                text: "$add",
                                                link: "/build/aggregation/expression/accumulators/add"
                                            }
                                        ]
                                    },
                                    {
                                        text: '更新中...',
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },
            {
                text: '钩子 (Hooks)',
                collapsed: true,
                items: [
                    {text: '模型钩子（Model Hooks）', link: '/hooks/model-hooks'},
                    {text: '一次性钩子', link: '/hooks/one-time-hooks'}
                ]
            },
            {
                text: '插件（Plugins）',
                collapsed: true,
                items: [
                    {text: '插件化编程', link: '/plugins/plugins'},
                    {text: '上下文对象', link: '/plugins/op-context'},
                    {text: '插件类型', link: '/plugins/op-type'},
                ]
            },
            {
                text: 'mongox 更新日志',
                link: '/changelog'
            },
            {
                text: '更新中...',
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/chenmingyong0423/go-mongox'}
        ],

        footer: {
            message: '文档根据 <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">CC BY 4.0.</a> 许可证授权',
            copyright: `版权所有 © 2024-${new Date().getFullYear()} <a href="https://github.com/chenmingyong0423" target="_blank">陈明勇</a>`
        },
    },
})