import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

interface AiAssistantProps {
  userRole: string;
}

export const AiAssistant = ({ userRole }: AiAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: `Bonjour ! Je suis votre assistant IA pour ${getRoleText(userRole)}. Comment puis-je vous aider aujourd'hui ?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  function getRoleText(role: string) {
    switch (role) {
      case "hospital":
        return "la gestion hospitalière";
      case "pharmacy":
        return "la pharmacie centrale";
      case "delivery":
        return "la livraison";
      case "patient":
        return "le suivi patient";
      default:
        return "la plateforme médicale";
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Simuler une réponse de l'IA
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: getAiResponse(inputValue, userRole),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);

    setInputValue("");
  };

  const getAiResponse = (input: string, role: string) => {
    const responses = {
      hospital: [
        "Je peux vous aider à créer une nouvelle ordonnance électronique.",
        "Voici les médicaments disponibles en pharmacie centrale.",
        "Le statut de la dernière prescription a été mis à jour.",
      ],
      pharmacy: [
        "Je vais vérifier la disponibilité en stock pour cette commande.",
        "La préparation de cette ordonnance peut commencer.",
        "Notification envoyée à l'équipe de livraison.",
      ],
      delivery: [
        "Nouvelle demande de livraison reçue et assignée.",
        "Itinéraire optimisé calculé pour vos livraisons.",
        "Statut de livraison mis à jour automatiquement.",
      ],
      patient: [
        "Votre commande est en cours de préparation à la pharmacie.",
        "Notification : votre médicament sera livré demain.",
        "Merci pour votre retour sur la qualité du service.",
      ],
    };

    const roleResponses = responses[role as keyof typeof responses] || responses.patient;
    return roleResponses[Math.floor(Math.random() * roleResponses.length)];
  };

  if (!isOpen) {
    return (
      <Button
        variant="floating"
        size="icon"
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-floating z-50"
        onClick={() => setIsOpen(true)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 bg-gradient-card backdrop-blur-sm border-border/50 shadow-floating z-50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Bot className="h-4 w-4 text-hedera" />
          Assistant IA
        </CardTitle>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          ×
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto space-y-3 mb-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[70%] p-2 rounded-lg text-xs ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <div className="flex items-center gap-1 mb-1">
                  {message.type === "user" ? (
                    <User className="h-3 w-3" />
                  ) : (
                    <Bot className="h-3 w-3" />
                  )}
                  <span className="font-medium">
                    {message.type === "user" ? "Vous" : "Assistant"}
                  </span>
                </div>
                {message.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Tapez votre message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="text-xs"
          />
          <Button variant="default" size="icon" onClick={handleSendMessage}>
            <Send className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};