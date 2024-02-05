import { PageContainer, ProCard } from '@ant-design/pro-components';
import { theme } from 'antd';
import React from 'react';

const InfoCard: React.FC<{
  title: string;
  index: number;
  desc: string;
  href: string;
}> = ({ title, href, index, desc }) => {
  const { useToken } = theme;

  const { token } = useToken();

  return (
    <div
      style={{
        backgroundColor: token.colorBgContainer,
        boxShadow: token.boxShadow,
        borderRadius: '8px',
        fontSize: '14px',
        color: token.colorTextSecondary,
        lineHeight: '22px',
        padding: '16px 19px',
        minWidth: '220px',
        flex: 1,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            lineHeight: '22px',
            backgroundSize: '100%',
            textAlign: 'center',
            padding: '8px 16px 16px 12px',
            color: '#FFF',
            fontWeight: 'bold',
            backgroundImage:
              "url('https://gw.alipayobjects.com/zos/bmw-prod/daaf8d50-8e6d-4251-905d-676a24ddfa12.svg')",
          }}
        >
          {index}
        </div>
        <div
          style={{
            fontSize: '16px',
            color: token.colorText,
            paddingBottom: 8,
          }}
        >
          {title}
        </div>
      </div>
      <div
        style={{
          fontSize: '14px',
          color: token.colorTextSecondary,
          textAlign: 'justify',
          lineHeight: '22px',
          marginBottom: 8,
        }}
      >
        {desc}
      </div>
      <a href={href} target="_blank" rel="noreferrer">
        了解更多 {'>'}
      </a>
    </div>
  );
};

const Welcome: React.FC = () => {
  const { token } = theme.useToken();
  return (
    <PageContainer>
      <ProCard
        style={{
          borderRadius: 8,
        }}
        bodyStyle={{
          backgroundColor: '#f5f4f1',
        }}
        boxShadow
      >
        <div>
          <div
            style={{
              fontSize: '20px',
              color: token.colorTextHeading,
            }}
          >
            欢迎来到我们的BI平台！
          </div>
          <p
            style={{
              fontSize: '14px',
              lineHeight: '22px',
              marginTop: 16,
              marginBottom: 32,
              width: '80%',
            }}
          >
            我们的平台是一款革命性的商业智能工具，旨在让数据分析变得更加简单直观。与传统的BI平台不同，我们的平台摒弃了繁琐的图表创建和数据选择过程，让用户专注于他们的分析需求。
            <p />
            无需花费时间选择数据和创建图表。您只需输入您的分析需求以及数据来源，我们的平台将自动为您生成符合您需求的图表。无论您是想了解销售趋势、用户行为还是市场预测，我们的平台都能为您提供定制化的解决方案。
            <p />
            我们的平台采用先进的人工智能技术，通过理解您的需求和数据，快速生成适合您的可视化图表，让您能够更轻松地发现数据背后的价值，做出明智的商业决策。
            <p />
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
            }}
          >
            <InfoCard
              index={1}
              href="/chart/add"
              title="分析图表（同步）"
              desc="同步分析图表是我们平台的一个强大工具，旨在帮助您在分析数据量较小，想及时得到结论的分析场景中，更快，更稳定的得到数据之间的关系，并从中发现有价值的见解，从而更全面地理解数据背后的故事！"
            />
            <InfoCard
              index={2}
              href="/chart/add_async"
              title="分析图表（异步）"
              desc="异步分析图表是我们平台的一个强大功能，旨在让您能够以自己的节奏深入分析数据，发现数据中的模式和见解。与传统的同步分析不同，异步分析允许您根据自己的需求和时间安排进行数据探索，而不受时间和空间的限制！"
            />
            <InfoCard
              index={3}
              title="管理图表"
              href="/chart/list"
              desc="在我们的平台上，我们为您提供了全面的图表管理工具，帮助您轻松管理和组织您的数据可视化。"
            />
          </div>
        </div>
      </ProCard>
    </PageContainer>
  );
};

export default Welcome;
