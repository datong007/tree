import { useState, useRef } from 'react';
import { FaMicrophone, FaStop, FaPaperPlane } from 'react-icons/fa';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatDialog() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  // 发送文本消息
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 开始录音
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
        await handleAudioUpload(audioBlob);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Recording error:', error);
    }
  };

  // 停止录音
  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      setIsRecording(false);
    }
  };

  // 处理音频上传
  const handleAudioUpload = async (audioBlob: Blob) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('audio', audioBlob);

    try {
      const response = await fetch('/api/speech-to-text', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.text) {
        setMessages(prev => [...prev, 
          { role: 'user', content: data.text },
          { role: 'assistant', content: data.response }
        ]);
      }
    } catch (error) {
      console.error('Audio upload error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 w-96 bg-white rounded-lg shadow-xl">
      {/* 对话历史 */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg px-4 py-2 text-gray-500">
              思考中...
            </div>
          </div>
        )}
      </div>

      {/* 输入区域 */}
      <div className="border-t p-4 flex items-center gap-2">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-2 rounded-full ${
            isRecording ? 'bg-red-500' : 'bg-blue-500'
          } text-white`}
        >
          {isRecording ? <FaStop /> : <FaMicrophone />}
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="输入问题..."
          className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={!input.trim()}
          className="p-2 bg-blue-500 text-white rounded-full disabled:opacity-50"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
} 