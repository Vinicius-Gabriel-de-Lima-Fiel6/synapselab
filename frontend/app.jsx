import React, { useState } from 'react';
import { 
  User, 
  LogOut, 
  Settings, 
  ChevronDown, 
  Package, 
  Calculator, 
  BarChart3, 
  FileText, 
  LayoutDashboard, 
  Table2, 
  Users,
  Eye,
  EyeOff
} from 'lucide-react';
import './App.css';

// Login Page Component
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({
      name: 'Dr. Ana Silva',
      company: 'BioTech Solutions',
      role: 'Coordenadora de Pesquisa',
      avatar: 'AS'
    });
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="floating-element element-1"></div>
        <div className="floating-element element-2"></div>
        <div className="floating-element element-3"></div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-symbol">S</div>
          </div>
          <h1 className="login-title">SynapseLab</h1>
          <p className="login-subtitle">Sistema de Gestão Laboratorial</p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary">
            Entrar no Sistema
          </button>
        </form>

        <div className="login-actions">
          <button className="btn-secondary">
            Cadastre sua Empresa
          </button>
          <button className="btn-secondary">
            Recuperar Senha
          </button>
        </div>

        <div className="login-footer">
          <p>© 2026 SynapseLab. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard({ user, onLogout }) {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const menuItems = [
    { id: 'stock', label: 'Sala de Estoque', icon: Package },
    { id: 'calculator', label: 'Calculadora Química', icon: Calculator },
    { id: 'charts', label: 'Gráficos', icon: BarChart3 },
    { id: 'reports', label: 'Relatórios', icon: FileText },
    { id: 'dashboard', label: 'Painel de Controle', icon: LayoutDashboard },
    { id: 'tables', label: 'Tabelas', icon: Table2 },
    { id: 'team', label: 'Gestão de Equipe', icon: Users },
  ];

  const renderContent = () => {
    const pageConfig = {
      stock: { title: 'Sala de Estoque', description: 'Gerencie seu inventário de reagentes e materiais' },
      calculator: { title: 'Calculadora Química', description: 'Ferramentas para cálculos e conversões químicas' },
      charts: { title: 'Gráficos', description: 'Visualize dados e tendências laboratoriais' },
      reports: { title: 'Relatórios', description: 'Gere e consulte relatórios detalhados' },
      dashboard: { title: 'Painel de Controle', description: 'Visão geral do laboratório' },
      tables: { title: 'Tabelas', description: 'Consulte tabelas e dados técnicos' },
      team: { title: 'Gestão de Equipe', description: 'Administre colaboradores e permissões' },
    };

    const config = pageConfig[currentPage];

    return (
      <div className="content-page">
        <div className="page-header">
          <h2 className="page-title">{config.title}</h2>
          <p className="page-description">{config.description}</p>
        </div>
        <div className="page-content">
          <div className="placeholder-content">
            <div className="placeholder-icon">
              {React.createElement(menuItems.find(item => item.id === currentPage)?.icon || LayoutDashboard, { size: 64 })}
            </div>
            <p>Conteúdo em desenvolvimento</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-container-small">
            <div className="logo-symbol-small">S</div>
          </div>
          <span className="sidebar-title">SynapseLab</span>
        </div>

        <div className="user-profile-card">
          <div className="avatar-large">
            {user.avatar}
          </div>
          <div className="user-info">
            <h3 className="user-name">{user.name}</h3>
            <p className="user-company">{user.company}</p>
            <span className="user-role">{user.role}</span>
          </div>
        </div>

        <div className="dropdown-container">
          <button 
            className="dropdown-trigger"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>Opções</span>
            <ChevronDown 
              size={18} 
              className={`chevron ${dropdownOpen ? 'open' : ''}`}
            />
          </button>
          
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item">
                <Settings size={18} />
                <span>Configurações</span>
              </button>
              <button className="dropdown-item">
                <User size={18} />
                <span>Editar Perfil</span>
              </button>
              <div className="dropdown-divider"></div>
              <button className="dropdown-item logout" onClick={onLogout}>
                <LogOut size={18} />
                <span>Sair do Sistema</span>
              </button>
            </div>
          )}
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="main-content">
        <div className="content-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}

// Main App Component
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <div className="app">
      {isLoggedIn ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
