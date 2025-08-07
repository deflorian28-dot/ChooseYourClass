import { useState, useEffect } from "react";

type NodeID = string;

type QuestionNode = {
  text: string;
  options: { [key: NodeID]: string };
};

type ResultNode = {
  text: string;
  options?: undefined;
};

type DecisionTree = {
  [key: NodeID]: QuestionNode | ResultNode;
};

const decisionTree: DecisionTree = {
  start: {
    text: "Vorresti che il tuo personaggio lanciasse incantesimi, combattesse senza incantesimi o un mix delle due?",
    options: {
      "1": "Lancia incantesimi",
      "2": "Combatte senza incantesimi",
      "3": "Mix dei due",
    },
  },

  // Path 1 - Magic
  "1": {
    text: "Il tuo personaggio ha dedicato tutta la sua vita a questa magia o è qualcosa che gli viene più naturale?",
    options: {
      "4": "Tutta la vita",
      "5": "Gli viene naturale",
    },
  },
  "4": {
    text: "Il tuo personaggio si concentra di più sul suo credo o sui suoi studi?",
    options: {
      "6": "Credo",
      "7": "Studi",
    },
  },
  "6": {
    text: "Il suo credo è uno di fede e religione o uno di asservimento e di ricerca di potere?",
    options: {
      end1: "Fede e religione",
      end2: "Asservimento e potere",
    },
  },
  "7": {
    text: "Il tuo personaggio preferisce essere il più versatile possibile o concentrarsi sugli incantesimi più potenti?",
    options: {
      end3: "Versatile",
      end4: "Incantesimi potenti",
    },
  },
  "5": {
    text: "Il tuo personaggio preferisce conoscere una grande quantità di incantesimi tra cui scegliere ogni giorno o pochi incantesimi che può usare a piacimento?",
    options: {
      "25": "Grande quantità tra cui scegliere",
      "26": "Pochi ma illimitati",
    },
  },
  "25": {
    text: "Il tuo personaggio preferisce essere più versatile o più diretto e distruttivo?",
    options: {
      end5: "Versatile",
      end6: "Diretto e distruttivo",
    },
  },
  "26": {
    text: "Il tuo personaggio è più affine a creature di altri mondi o ai potenti draghi?",
    options: {
      end7: "Creature di altri mondi",
      end8: "Potenti draghi",
    },
  },

  // Path 2 - No Magic
  "2": {
    text: "Che tipo di armi utilizza il tuo personaggio? A lungo raggio, combattimento ravvicinato o preferisce non usare armi?",
    options: {
      "8": "Lungo raggio",
      "9": "Combattimento ravvicinato",
      "10": "Non usa armi",
    },
  },
  "8": {
    text: "Il tuo personaggio vorrebbe avere un compagno animale?",
    options: {
      end9: "Sì",
      "12": "No",
    },
  },
  "12": {
    text: "Al tuo personaggio piace avere tante opzioni diverse in combattimento o preferisce specializzarsi su una singola cosa?",
    options: {
      "30": "Tante opzioni",
      "29": "Specializzarsi",
    },
  },
  "30": {
    text: "Il tuo personaggio preferisce uno stile pesante e resistente, mobile e atletico o uno versatile?",
    options: {
      end10: "Pesante e resistente",
      end11: "Mobile e atletico",
      end12: "Versatile",
    },
  },
  "29": {
    text: "Il tuo personaggio usa tecniche e strategie o abilità e forza?",
    options: {
      "44": "Strategie",
      end15: "Abilità e forza",
    },
  },
  "44": {
    text: "Usa le sue capacità per battere l'avversario o per guidare il gruppo?",
    options: {
      end13: "Battere l'avversario",
      end14: "Guidare il gruppo",
    },
  },
  "9": {
    text: "Il tuo personaggio combatte in modo normale o con trucchi sporchi/brutali?",
    options: {
      "13": "Normale",
      "14": "Trucchi sporchi",
    },
  },
  "13": {
    text: "Tante opzioni o specializzazione?",
    options: {
      "30": "Tante opzioni",
      "29": "Specializzarsi",
    },
  },
  "14": {
    text: "Combattimento con forza bruta o sottile e preciso?",
    options: {
      end16: "Forza bruta",
      end17: "Sottile e preciso",
    },
  },
  "10": {
    text: "Usa arti marziali o mezzi ferali?",
    options: {
      end18: "Arti marziali",
      end19: "Mezzi ferali",
    },
  },

  // Path 3 - Mix
  "3": {
    text: "Il tuo personaggio combatte più con la magia o in altri modi?",
    options: {
      "17": "Magia",
      "18": "Altri modi",
    },
  },
  "17": {
    text: "Più vicino alla vita di città o alla natura?",
    options: {
      "19": "Città",
      "20": "Natura",
    },
  },
  "19": {
    text: "Fa un po’ tutto o ha interessi specifici?",
    options: {
      end20: "Un po’ tutto",
      "34": "Interessi specifici",
    },
  },
  "34": {
    text: "Gli piace più l’arte, la scienza o il combattimento?",
    options: {
      end21: "Arte",
      end22: "Scienza",
      "39": "Combattimento",
    },
  },
  "39": {
    text: "Combattimento diretto o con sotterfugi?",
    options: {
      end23: "Diretto",
      end24: "Sotterfugi",
    },
  },
  "20": {
    text: "Ha un legame più con gli elementi o con gli animali?",
    options: {
      end25: "Elementi",
      end26: "Animali",
    },
  },
  "18": {
    text: "Si concentra su credo, studi o poteri?",
    options: {
      end27: "Credo",
      end28: "Studi",
      end29: "Poteri",
    },
  },

  // Results
  end1: { text: "Chierico" },
  end2: { text: "Binder" },
  end3: { text: "Archivista" },
  end4: { text: "Mago" },
  end5: { text: "Psion" },
  end6: { text: "Stregone" },
  end7: { text: "Warlock" },
  end8: { text: "Dragonfire Adept" },
  end9: { text: "Ranger" },
  end10: { text: "Crusader" },
  end11: { text: "Swordsage" },
  end12: { text: "Warblade" },
  end13: { text: "Swashbuckler" },
  end14: { text: "Maresciallo" },
  end15: { text: "Ladro" },
  end16: { text: "Barbaro" },
  end17: { text: "Ladro" },
  end18: { text: "Monaco" },
  end19: { text: "Totemist" },
  end20: { text: "Factotum" },
  end21: { text: "Bardo" },
  end22: { text: "Artefice" },
  end23: { text: "Mago combattente" },
  end24: { text: "Beguiler" },
  end25: { text: "Shugenja" },
  end26: { text: "Druido" },
  end27: { text: "Paladino" },
  end28: { text: "Duskblade" },
  end29: { text: "Guerriero psionico" },
};

export default function App() {
  const [currentNode, setCurrentNode] = useState<NodeID>("start");
  const [isWaiting, setIsWaiting] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const node = decisionTree[currentNode];

  useEffect(() => {
    if (!node?.options) {
      setIsWaiting(true);
      setShowResult(false);
      const timer = setTimeout(() => {
        setIsWaiting(false);
        setShowResult(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setIsWaiting(false);
      setShowResult(false);
    }
  }, [node]);

  const restart = () => setCurrentNode("start");

  if (!node) {
    return (
      <div style={{ padding: 20 }}>
        <p>Errore: nodo non trovato</p>
        <button onClick={restart}>Ricomincia</button>
      </div>
    );
  }

  if (!node.options) {
    if (isWaiting && !showResult) {
      return (
        <div style={{
          maxWidth: 600,
          margin: "40px auto",
          padding: 20,
          textAlign: "center",
          border: "1px solid #ccc",
          borderRadius: 8,
        }}>
          <div className="hourglass-container">
            <svg className="hourglass" viewBox="0 0 64 96" width="80" height="120">
              <g>
                <rect x="20" y="8" width="24" height="8" rx="4" fill="#bfa76a" />
                <rect x="20" y="80" width="24" height="8" rx="4" fill="#bfa76a" />
                <path d="M24 16 Q32 48 24 80" stroke="#bfa76a" strokeWidth="4" fill="none" />
                <path d="M40 16 Q32 48 40 80" stroke="#bfa76a" strokeWidth="4" fill="none" />
                <polygon className="hourglass-sand-top" points="28,24 36,24 32,44" fill="#ffe066" />
                <rect className="hourglass-sand-flow" x="30.5" y="44" width="3" height="16" rx="1.5" fill="#ffe066" />
                <ellipse className="hourglass-sand-bottom" cx="32" cy="72" rx="8" ry="4" fill="#ffe066" />
              </g>
            </svg>
            <div style={{ marginTop: 16, fontSize: 20, color: '#bfa76a' }}>Calcolo in corso...</div>
          </div>
        </div>
      );
    }
    if (showResult) {
      return (
        <div
          style={{
            maxWidth: 600,
            margin: "40px auto",
            padding: 20,
            textAlign: "center",
            border: "1px solid #ccc",
            borderRadius: 8,
          }}
        >
          <h2 style={{ fontSize: 24, marginBottom: 20 }}> 389 Risultato: {node.text}</h2>
          <button
            onClick={restart}
            style={{
              padding: "10px 20px",
              fontSize: 16,
              cursor: "pointer",
              borderRadius: 4,
              backgroundColor: "#003366",
              color: "#ffffff",
              border: "none",
            }}
          >
            Ricomincia
          </button>
        </div>
      );
    }
  }

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 20,
        border: "1px solid #ccc",
        borderRadius: 8,
      }}
    >
      <h2 style={{ fontSize: 20, marginBottom: 16 }}>{node.text}</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {Object.entries(node.options).map(([nextId, optionText]) => (
          <button
            key={nextId}
            onClick={() => setCurrentNode(nextId)}
            style={{
              padding: "10px",
              fontSize: 16,
              cursor: "pointer",
              borderRadius: 4,
              border: "1px solid #666",
              backgroundColor: "#003366",
              color: "#ffffff",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#0055aa")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#003366")
            }
          >
            {optionText}
          </button>
        ))}
      </div>
    </div>
  );
}
