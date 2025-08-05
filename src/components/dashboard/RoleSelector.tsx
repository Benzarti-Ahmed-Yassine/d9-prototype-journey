import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Pill, Truck, User } from "lucide-react";

interface RoleSelectorProps {
  onRoleSelect: (role: string) => void;
}

export const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  const roles = [
    {
      id: "hospital",
      name: "Hôpital",
      description: "Prescrire et suivre les ordonnances",
      icon: Building2,
      color: "medical",
    },
    {
      id: "pharmacy",
      name: "Pharmacie Centrale",
      description: "Préparer et valider les commandes",
      icon: Pill,
      color: "secondary",
    },
    {
      id: "delivery",
      name: "Société de Livraison",
      description: "Gérer et suivre les livraisons",
      icon: Truck,
      color: "outline",
    },
    {
      id: "patient",
      name: "Patient",
      description: "Suivre et recevoir les commandes",
      icon: User,
      color: "hedera",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Plateforme Médicale Intégrée
          </h1>
          <p className="text-white/80 text-lg">
            Gestion sécurisée du parcours du médicament avec technologie Hedera
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className="bg-gradient-card backdrop-blur-sm border-border/50 shadow-floating hover:shadow-card transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => onRoleSelect(role.id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-gradient-primary rounded-full w-fit">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant={role.color as any} 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRoleSelect(role.id);
                    }}
                  >
                    Accéder
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-white/60 text-sm">
            <div className="w-2 h-2 bg-hedera rounded-full animate-pulse-soft"></div>
            <span>Sécurisé par Hedera Hashgraph</span>
          </div>
        </div>
      </div>
    </div>
  );
};