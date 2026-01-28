import { useState } from "react";
import "./Booking.css";
import { studioInfo } from "../config/studioConfig";

export default function Booking() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    data: "",
    estilo: "tradicional",
    localizacao: "",
    tamanho: "medio",
    horarioPreferencial: "sem_preferencia",
    descricao: "",
    referencia: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
    
    // Auto-resize textarea
    if (e.target.tagName === 'TEXTAREA') {
      e.target.style.height = 'auto';
      e.target.style.height = e.target.scrollHeight + 'px';
    }
  }

  function handleFileChange(e) {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length > 5) {
      setError("Máximo de 5 imagens permitidas");
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg"]; // jpg/jpeg/png
    const filteredFiles = selectedFiles.filter(
      (file) => allowedTypes.includes(file.type) || /\.(png|jpe?g)$/i.test(file.name)
    );

    if (filteredFiles.length === 0) {
      setFiles([]);
      setPreviews([]);
      setError("Apenas PNG e JPG/JPEG são permitidos");
      return;
    }

    if (filteredFiles.length !== selectedFiles.length) {
      setError("Alguns ficheiros foram ignorados. Apenas PNG e JPG/JPEG são permitidos.");
    } else if (error) {
      setError("");
    }

    setFiles(filteredFiles);

    // Criar previews
    const newPreviews = filteredFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  }

  function removeFile(index) {
    const newFiles = files.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    
    // Liberar memória do preview removido
    URL.revokeObjectURL(previews[index]);
    
    setFiles(newFiles);
    setPreviews(newPreviews);
  }

  function validarForm() {
    if (!form.nome.trim()) return "Nome é obrigatório";
    if (!form.email.trim()) return "Email é obrigatório";
    if (!form.email.includes("@")) return "Email inválido";
    if (form.telefone.trim()) {
      const telefoneDigits = form.telefone.replace(/\D/g, '');
      if (telefoneDigits.length !== 9) return "Telefone deve ter exatamente 9 dígitos";
    }
    if (!form.data) return "Data é obrigatória";
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataSelecionada = new Date(form.data + 'T00:00:00');
    if (dataSelecionada < hoje) return "Data deve ser hoje ou futura";
    
    if (!form.localizacao.trim()) return "Localização é obrigatória";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    const validacao = validarForm();
    if (validacao) {
      setError(validacao);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/agendamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          telefone: form.telefone,
          data: form.data,
          horarioPreferencial: form.horarioPreferencial,
          estilo: form.estilo,
          localizacao: form.localizacao,
          tamanho: form.tamanho,
          descricao: form.descricao,
          imagensReferencia: files.map(f => f.name).join(', ')
        })
      });

      if (response.ok) {
        setSuccess(true);
        setForm({
          nome: "",
          email: "",
          telefone: "",
          data: "",
          estilo: "tradicional",
          localizacao: "",
          tamanho: "medio",
          horarioPreferencial: "sem_preferencia",
          descricao: "",
          referencia: ""
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError("Erro ao enviar agendamento. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro:", error);
      setError("Erro de conexão. Verifique se o servidor está ligado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="booking">
      {success && (
        <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="Agendamento enviado">
          <div className="popup">
            <h2 className="popup-title">Pedido de Agendamento Enviado</h2>
            <p>✓ Agendamento enviado com sucesso! Entraremos em contacto em breve.</p>
            <button type="button" className="popup-close" onClick={() => setSuccess(false)}>Fechar</button>
          </div>
        </div>
      )}
      <div className="booking-container">
        <div className="booking-header">
          <h1>Agendar Tatuagem</h1>
          <p>Preencha o formulário abaixo e entraremos em contacto para confirmar seu agendamento</p>
        </div>

        <div className="booking-content">
          <div className="booking-info">
            <div className="info-card">
              <h3>📍 Localização</h3>
              <p>{studioInfo.morada}</p>
              <p className="small">{studioInfo.cidade}, {studioInfo.pais}</p>
            </div>
            <div className="info-card">
              <h3>⏰ Horário</h3>
              <div className="schedule-compact">
                <p><strong>Seg-Sáb:</strong> {studioInfo.horario[0].horas}</p>
                <p><strong>Domingo:</strong> {studioInfo.horario[6].horas}</p>
              </div>
            </div>
            <div className="info-card">
              <h3>📞 Contacto</h3>
              <p><a href={`tel:${studioInfo.telefone.replace(/\s/g, '')}`}>{studioInfo.telefone}</a></p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="booking-form">
            {error && <div className="error-message">✗ {error}</div>}

            <div className="form-row">
              <div className="form-group">
                <label>Nome Completo *</label>
                <input
                  type="text"
                  name="nome"
                  placeholder="João Silva"
                  value={form.nome}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  placeholder="(+351) 912 345 678"
                  value={form.telefone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Data Desejada *</label>
                <input
                  type="date"
                  name="data"
                  value={form.data}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Horário Preferencial</label>
                <select name="horarioPreferencial" value={form.horarioPreferencial} onChange={handleChange}>
                  <option value="sem_preferencia">Sem Preferência</option>
                  <option value="manha">Manhã</option>
                  <option value="tarde">Tarde</option>
                </select>
              </div>
              <div className="form-group">
                <label>Estilo de Tatuagem</label>
                <select name="estilo" value={form.estilo} onChange={handleChange}>
                  <option value="tradicional">Tradicional</option>
                  <option value="realista">Realista</option>
                  <option value="minimalista">Minimalista</option>
                  <option value="geometrica">Geométrica</option>
                  <option value="aquarela">Aquarela</option>
                  <option value="tribal">Tribal</option>
                  <option value="nao sei">Não Sei</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Localização no Corpo *</label>
                <input
                  type="text"
                  name="localizacao"
                  placeholder="ex: Braço, Costas, Perna"
                  value={form.localizacao}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Tamanho Aproximado</label>
                <select name="tamanho" value={form.tamanho} onChange={handleChange}>
                  <option value="pequeno">Pequeno (menor que 5cm)</option>
                  <option value="medio">Médio (5-15cm)</option>
                  <option value="grande">Grande (15-30cm)</option>
                  <option value="muito_grande">Muito Grande (maior que 30cm)</option>
                </select>
              </div>
            </div>

            <div className="form-group full-width">
              <label>Descrição da Tatuagem</label>
              <textarea
                name="descricao"
                placeholder="Descreva a tatuagem que deseja..."
                value={form.descricao}
                onChange={handleChange}
                rows={3}
                className="auto-resize-textarea"
              />
            </div>

            <div className="form-group full-width">
              <label>Imagens de Referência</label>
              <div className="file-upload-area">
                <input
                  type="file"
                  id="file-upload"
                  accept="image/png,image/jpeg,.png,.jpg,.jpeg"
                  multiple
                  onChange={handleFileChange}
                  className="file-input"
                />
                <label htmlFor="file-upload" className="file-upload-label">
                  <span className="upload-icon">📷</span>
                  <span className="upload-text">
                    {files.length > 0 
                      ? `${files.length} imagem(ns) selecionada(s)` 
                      : "Clique ou arraste imagens aqui"}
                  </span>
                  <span className="upload-hint">Máximo 5 imagens (JPG, JPEG, PNG)</span>
                </label>
              </div>
              
              {previews.length > 0 && (
                <div className="image-previews">
                  {previews.map((preview, index) => (
                    <div key={index} className="preview-item">
                      <img src={preview} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-preview"
                        onClick={() => removeFile(index)}
                        title="Remover imagem"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "A enviar..." : "Agendar Agora"}
            </button>

            <p className="form-note">* Campos obrigatórios</p>
          </form>
        </div>
      </div>
    </section>
  );
}
