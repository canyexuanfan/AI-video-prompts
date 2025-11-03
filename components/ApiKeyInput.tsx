import React, { useState, useEffect } from 'react';

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
  onModelIdChange: (modelId: string) => void;
  isRequired?: boolean;
}

const API_KEY_STORAGE_KEY = 'doubao-api-key';
const MODEL_ID_STORAGE_KEY = 'doubao-model-id';

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeyChange, onModelIdChange, isRequired = true }) => {
  const [apiKey, setApiKey] = useState<string>('');
  const [modelId, setModelId] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isConfigured, setIsConfigured] = useState<boolean>(false);

  // 从localStorage加载API密钥和模型ID
  useEffect(() => {
    const savedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    const savedModelId = localStorage.getItem(MODEL_ID_STORAGE_KEY);
    
    if (savedApiKey) {
      setApiKey(savedApiKey);
      onApiKeyChange(savedApiKey);
    }
    
    if (savedModelId) {
      setModelId(savedModelId);
      onModelIdChange(savedModelId);
    } else {
      // 设置默认模型ID
      const defaultModelId = 'doubao-pro-4k';
      setModelId(defaultModelId);
      localStorage.setItem(MODEL_ID_STORAGE_KEY, defaultModelId);
      onModelIdChange(defaultModelId);
    }
    
    setIsConfigured(!!savedApiKey);
  }, [onApiKeyChange, onModelIdChange]);

  const handleApiKeyChange = (value: string) => {
    setApiKey(value);
    
    // 保存到localStorage
    if (value.trim()) {
      localStorage.setItem(API_KEY_STORAGE_KEY, value.trim());
      setIsConfigured(true);
    } else {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
      setIsConfigured(false);
    }
    
    onApiKeyChange(value.trim());
  };

  const handleModelIdChange = (value: string) => {
    setModelId(value);
    
    // 保存到localStorage
    if (value.trim()) {
      localStorage.setItem(MODEL_ID_STORAGE_KEY, value.trim());
    } else {
      localStorage.removeItem(MODEL_ID_STORAGE_KEY);
    }
    
    onModelIdChange(value.trim());
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const clearApiKey = () => {
    setApiKey('');
    setModelId('doubao-pro-4k'); // 重置为默认模型ID
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    localStorage.setItem(MODEL_ID_STORAGE_KEY, 'doubao-pro-4k');
    setIsConfigured(false);
    onApiKeyChange('');
    onModelIdChange('doubao-pro-4k');
  };

  return (
    <div className="w-full bg-gray-800 rounded-xl p-4 border-2 border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-200">API 密钥配置</h3>
          {isConfigured && (
            <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
              已配置
            </span>
          )}
          {isRequired && !isConfigured && (
            <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">
              必需
            </span>
          )}
        </div>
        {isConfigured && (
          <button
            onClick={clearApiKey}
            className="text-red-400 hover:text-red-300 text-sm transition-colors"
          >
            清除
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="relative">
          <input
            type={isVisible ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => handleApiKeyChange(e.target.value)}
            placeholder="请输入您的火山引擎豆包 API 密钥"
            className="w-full p-3 bg-gray-900 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-300 placeholder-gray-500 pr-20"
          />
          <button
            type="button"
            onClick={toggleVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
          >
            {isVisible ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464m1.414 1.414L8.464 8.464m5.656 5.656l1.415 1.415m-1.415-1.415l1.415 1.415M12 3c.796 0 1.559.102 2.303.284" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="relative">
          <input
            type="text"
            value={modelId}
            onChange={(e) => handleModelIdChange(e.target.value)}
            placeholder="请输入模型ID (如: doubao-pro-4k 或您的推理接入点ID)"
            className="w-full p-3 bg-gray-900 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-gray-300 placeholder-gray-500"
          />
        </div>
        
        <div className="text-sm text-gray-400 space-y-1">
          <p>• 请在 <a href="https://console.volcengine.com/ark" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">火山引擎控制台</a> 获取您的 API 密钥</p>
          <p>• 模型ID可以是通用模型(如doubao-pro-4k)或您创建的推理接入点ID</p>
          <p>• API 密钥将安全地保存在您的浏览器本地存储中</p>
          <p>• 我们不会收集或存储您的 API 密钥和模型配置</p>
        </div>
      </div>
    </div>
  );
};