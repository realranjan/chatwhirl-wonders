
import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, Smartphone, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoginFormProps {
  onLogin: (data: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      email,
      password,
      name,
      phone
    });
  };
  
  return (
    <div className="w-full max-w-md p-6 bg-white/20 backdrop-blur-md rounded-xl shadow-lg border border-white/20">
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-chat-primary to-chat-secondary bg-clip-text text-transparent">
        {isLogin ? 'Welcome back' : 'Join the conversation'}
      </h2>
      
      <div className="flex mb-8">
        <button
          className={cn(
            'flex-1 text-center py-2 border-b-2 font-medium transition-colors',
            isLogin 
              ? 'border-chat-primary text-chat-primary' 
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={cn(
            'flex-1 text-center py-2 border-b-2 font-medium transition-colors',
            !isLogin 
              ? 'border-chat-primary text-chat-primary' 
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium mb-1.5">Your Name</label>
            <div className="relative">
              <User className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                className="w-full py-2 px-10 bg-white/10 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-chat-primary transition-all"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium mb-1.5">Email</label>
          <div className="relative">
            <Mail className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="email"
              className="w-full py-2 px-10 bg-white/10 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-chat-primary transition-all"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium mb-1.5">Phone (optional)</label>
            <div className="relative">
              <Smartphone className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="tel"
                className="w-full py-2 px-10 bg-white/10 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-chat-primary transition-all"
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium mb-1.5">Password</label>
          <div className="relative">
            <Lock className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="password"
              className="w-full py-2 px-10 bg-white/10 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-chat-primary transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        
        {isLogin && (
          <div className="flex justify-end">
            <button type="button" className="text-sm text-chat-primary hover:underline">
              Forgot password?
            </button>
          </div>
        )}
        
        <button
          type="submit"
          className="w-full py-2.5 bg-gradient-to-r from-chat-primary to-chat-secondary text-white rounded-lg flex items-center justify-center gap-2 font-medium hover:opacity-95 transition-all"
        >
          {isLogin ? 'Sign in' : 'Create account'}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
