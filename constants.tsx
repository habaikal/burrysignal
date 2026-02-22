
import { RiskIndicator } from './types';

export const INDICATORS: RiskIndicator[] = [
  {
    id: 'ecfi',
    title: { en: 'Elite Consumption Fracture Index', ko: '엘리트 소비 균열 지수' },
    category: 'Elite Psychology',
    description: { 
      en: 'Secondary market listings and discounts for ultra-luxury assets (Patek Philippe, Supercars).',
      ko: '최상위 럭셔리 자산(파텍 필립, 슈퍼카 등)의 2차 시장 급매물 및 할인율 증가.'
    },
    simpleMeaning: {
      en: 'The wealthy are selling their prized possessions at deep discounts to raise cash fast.',
      ko: '부자들이 급하게 현금을 만들기 위해 애지중지하던 물건들을 헐값에 팔기 시작했습니다.'
    },
    value: 78,
    trend: 'up',
    color: '#ef4444',
    icon: '💎',
    logic: {
      en: 'True crises start silently at the top. Watch the prices of things they sell.',
      ko: '진짜 위기는 가장 위쪽에서 조용히 시작됩니다. 그들이 파는 물건의 가격을 보십시오.'
    }
  },
  {
    id: 'lds',
    title: { en: 'Linguistic Drift Signal', ko: '언어적 표류 신호' },
    category: 'Financial Semantics',
    description: {
      en: 'Shift in corporate filings from "growth" to "resilience" and "liquidity".',
      ko: '기업 보고서에서 "성장" 단어 감소, "회복력", "유동성" 단어 급증.'
    },
    simpleMeaning: {
      en: 'Companies stop talking about making money and start talking about how they plan to survive.',
      ko: '회사들이 돈 벌겠다는 말 대신, "어떻게든 버티겠다"는 말을 하기 시작했습니다.'
    },
    value: 85,
    trend: 'up',
    color: '#f97316',
    icon: '🗣️',
    logic: {
      en: 'Optimism is replaced by precision. When modifiers disappear, the storm is near.',
      ko: '수식어가 사라지고 조건문이 늘어납니다. 낙관주의가 정밀함으로 대체될 때 폭풍이 옵니다.'
    }
  },
  {
    id: 'r0',
    title: { en: 'Financial R₀ Index', ko: '금융 R₀ 지수' },
    category: 'Contagion Dynamics',
    description: {
      en: 'Insolvency contagion coefficient between systemic institutions.',
      ko: '시스템 기관 간의 부실 전염 계수.'
    },
    simpleMeaning: {
      en: 'The probability that one bank failing will trigger a chain reaction of collapses is high.',
      ko: '한 은행이 망했을 때 다른 은행들도 줄줄이 무너질 확률이 매우 높습니다.'
    },
    value: 62,
    trend: 'up',
    color: '#fbbf24',
    icon: '🦠',
    logic: {
      en: 'When R₀ exceeds 1.5, traditional capital injections cannot stop the domino effect.',
      ko: '전염 계수가 1.5를 넘으면, 전통적인 자금 투입으로는 연쇄 부도를 막을 수 없습니다.'
    }
  },
  {
    id: 'rcv',
    title: { en: 'Risk Concealment Velocity', ko: '위험 은폐 속도' },
    category: 'Structural Complexity',
    description: {
      en: 'Abnormal growth in derivative complexity and regulatory filing bulk.',
      ko: '복잡한 파생상품 발행 속도 및 규제 보고서의 비정상적 비대화.'
    },
    simpleMeaning: {
      en: 'Banks are making their paperwork so complex that no one can figure out what they are hiding.',
      ko: '금융사들이 무엇을 숨기고 있는지 알 수 없을 정도로 복잡한 서류를 만들기 시작했습니다.'
    },
    value: 91,
    trend: 'up',
    color: '#ef4444',
    icon: '📄',
    logic: {
      en: 'Risk hides behind complexity. It is over when a product cannot be explained in one sentence.',
      ko: '위험은 복잡성 뒤에 숨습니다. 상품을 한 문장으로 설명할 수 없을 때가 끝입니다.'
    }
  },
  {
    id: 'idi',
    title: { en: 'Insider Departure Index', ko: '내부자 이탈 지수' },
    category: 'Information Asymmetry',
    description: {
      en: 'Rate of personal asset liquidation by executives vs. public optimism.',
      ko: '공식적인 낙관론과 대조되는 내부 관계자들의 개인 자산 현금화 비율.'
    },
    simpleMeaning: {
      en: 'The people saying "everything is fine" are secretly selling their own stock.',
      ko: '앞에서는 "괜찮다"고 말하는 사람들이 뒤에서는 자기 주식을 몰래 팔고 있습니다.'
    },
    value: 74,
    trend: 'neutral',
    color: '#f97316',
    icon: '🎭',
    logic: {
      en: 'Watch their feet, not their mouths. See where they are running.',
      ko: '입이 아니라 발을 보십시오. 그들이 어디로 도망치고 있는지 확인해야 합니다.'
    }
  },
  {
    id: 'hmsi',
    title: { en: 'Elite Mental Stress Index', ko: '엘리트 정신적 압박 지수' },
    category: 'Unstructured Data',
    description: {
      en: 'Surge in sleep aid prescriptions and divorce filings in financial hubs.',
      ko: '금융 요충지 내 수면제 처방률 및 이혼 소송 급증.'
    },
    simpleMeaning: {
      en: 'The wealthy are losing sleep and their families are breaking apart. Something is wrong.',
      ko: '돈 많은 사람들이 잠을 못 자고 가정이 흔들리고 있습니다. 무언가 크게 잘못되었습니다.'
    },
    value: 45,
    trend: 'down',
    color: '#10b981',
    icon: '🧠',
    logic: {
      en: 'Fear manifests as biological signs long before it shows up in the markets.',
      ko: '위기는 마음에서 시작됩니다. 공포는 시장에 나타나기 전 생물학적 징후로 먼저 드러낭니다.'
    }
  },
  {
    id: 'scbi',
    title: { en: 'Central Bank Silence', ko: '중앙은행의 침묵' },
    category: 'Monetary Policy',
    description: {
      en: 'Decrease in policy transparency and increase in "long-term stability" rhetoric.',
      ko: '정책 투명성 감소 및 장기적 안정성 강조 수사 증가.'
    },
    simpleMeaning: {
      en: 'Officials are avoiding direct questions and only saying "things will be fine in the long run".',
      ko: '정부 관리들이 구체적인 답변을 피하고 "장기적으로는 괜찮다"는 말만 반복합니다.'
    },
    value: 82,
    trend: 'up',
    color: '#ef4444',
    icon: '🏦',
    logic: {
      en: 'When bankers pivot to long-term stability, the exits have already been locked.',
      ko: '은행가들이 질문에 답을 피하고 장기적 안정성을 논할 때, 출구는 이미 잠겼습니다.'
    }
  }
];
