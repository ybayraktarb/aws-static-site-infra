const upworkUrl = "https://www.upwork.com/freelancers/~0129cf9b4b891b37b4";

const portfolioData = {
    profile: {
        firstName: "Yusuf Berat",
        lastName: "Bayraktar",
        handle: "ybayraktarb",
        role: {
            tr: "Cloud & DevOps Mühendisi",
            en: "Cloud & DevOps Engineer"
        },
        location: {
            tr: "İstanbul, Türkiye",
            en: "Istanbul, Turkey"
        },
        photo: "image/cv.jpg",
        favicon: "image/favicon.svg",
        upworkUrl: upworkUrl
    },
    socials: [
        { name: "linkedin", url: "https://linkedin.com/in/ybayraktarb", icon: "image/linkedin.svg", tooltip: "LinkedIn" },
        { name: "github",   url: "https://github.com/ybayraktarb",      icon: "image/github.svg",   tooltip: "GitHub" },
        { name: "medium",   url: "https://medium.com/@ybayraktarb",     icon: "image/medium.svg",   tooltip: "Medium" },
        { name: "mail",     url: "mailto:ybayraktarb@gmail.com",         icon: "image/mail.svg",     tooltip: "E-mail" }
    ],
    tools: [
        { name: "aws",        url: "https://aws.amazon.com",       icon: "image/aws.svg",        tooltip: "Amazon Web Services" },
        { name: "terraform",  url: "https://www.terraform.io",     icon: "image/terraform.svg",  tooltip: "Terraform" },
        { name: "docker",     url: "https://www.docker.com/",      icon: "image/docker.svg",     tooltip: "Docker" },
        { name: "kubernetes", url: "https://kubernetes.io",        icon: "image/kubernetes.svg", tooltip: "Kubernetes" },
        { name: "jenkins",    url: "https://www.jenkins.io",       icon: "image/jenkins.svg",    tooltip: "Jenkins" }
    ],
    about: {},
    langs: [
        { code: "tr", flag: "🇹🇷", label: "Türkçe" },
        { code: "en", flag: "🇬🇧", label: "English" }
    ],
    experience: [
        {
            role:     { tr: "Junior Cloud & DevOps Mühendisi",   en: "Junior Cloud & DevOps Engineer" },
            company:  "Oreon Information Technology",
            link:     { url: "https://www.linkedin.com/in/ybayraktarb/", label: { tr: "LinkedIn'de Gör", en: "View on LinkedIn" } },
            type:     { tr: "Yarı Zamanlı",                      en: "Part-time" },
            period:   "Jan 2025 – Jun 2026",
            duration: "1 yr 6 mos",
            location: { tr: "Londra, İngiltere · Uzaktan",       en: "London, England · Remote" },
            bullets: [
                {
                    tr: "AWS Altyapı Kodu (Terraform): Güvenli, çok AZ'lu AWS ağ temeli (VPC, Subnet, NAT, IAM) sıfırdan inşa edildi. Mimari, gelecekteki Kubernetes kümeleri için 'EKS Hazır' olarak tasarlandı.",
                    en: "AWS Infrastructure as Code (Terraform): Engineered a secure, Multi-AZ AWS network foundation (VPC, Subnets, NAT, IAM) from scratch. Designed the architecture to be fully \"EKS-Ready,\" ensuring seamless integration for future Kubernetes clusters."
                },
                {
                    tr: "CI/CD Otomasyonu (GitHub Actions): Docker imaj oluşturma, test ve Amazon ECR'ye göndermeyi otomatikleştiren hafif ama sağlam bir CI pipeline geliştirildi. Branch Protection Rules ile kod kalitesi ve güvenlik sağlandı.",
                    en: "CI/CD Automation (GitHub Actions): Developed a lightweight yet robust CI pipeline that automates Docker image building, testing, and pushing to Amazon ECR. Enforced code quality and security through Branch Protection Rules."
                },
                {
                    tr: "Kubernetes Orkestrasyonu (Jenkins): Django uygulamalarının Kubernetes üzerindeki dağıtım yaşam döngüsü yönetildi. Sıfır kesintili güncelleme ve yüksek erişilebilirlik için otomatik geri alma aşamalı pipeline oluşturuldu.",
                    en: "Kubernetes Orchestration (Jenkins): Orchestrated the deployment lifecycle of Django applications on Kubernetes. Implemented a reliable pipeline with automated rollback stages to ensure zero-downtime updates and high availability."
                }
            ]
        },
        {
            role:     { tr: "Serbest Cloud & DevOps Mühendisi", en: "Freelance Cloud & DevOps Engineer" },
            company:  "Upwork",
            link:     { url: upworkUrl, label: { tr: "Upwork Profilini Gör", en: "View Upwork Profile" } },
            type:     { tr: "Sabit Fiyat",                      en: "Fixed Price" },
            period:   "Dec 2025",
            location: { tr: "Uzaktan",                          en: "Remote" },
            bullets: [
                {
                    tr: "Terraform ile AWS ECS + RDS altyapısı sıfırdan kuruldu; FastAPI backend ve React frontend production ortamına taşındı.",
                    en: "Built AWS ECS + RDS infrastructure from scratch with Terraform; deployed FastAPI backend and React frontend to production."
                },
                {
                    tr: "Müşteri yorumu: \"AWS servisleri ve Terraform konusundaki güçlü uzmanlığı sayesinde gereken çözümü beklediğimden çok daha hızlı, temiz ve sürdürülebilir bir şekilde sundu. Teknik becerinin yanı sıra işe güçlü bir mimari bakış açısı katıyor.\"",
                    en: "Client review: \"Thanks to his strong expertise in AWS services and Terraform, he delivered the required solution much faster than I expected, in a clean and sustainable way. He is not only technically skilled but also has a solid architectural perspective.\""
                }
            ]
        },
        {
            role:     { tr: "Serbest Cloud & DevOps Mühendisi", en: "Freelance Cloud & DevOps Engineer" },
            company:  "Upwork",
            link:     { url: upworkUrl, label: { tr: "Upwork Profilini Gör", en: "View Upwork Profile" } },
            type:     { tr: "Sabit Fiyat",                      en: "Fixed Price" },
            period:   "Jan 2026",
            location: { tr: "Uzaktan",                          en: "Remote" },
            bullets: [
                {
                    tr: "Terraform tabanlı ECS + RDS mimarisi üzerinde ikinci bir deployment projesi tamamlandı.",
                    en: "Completed a second deployment project on the same Terraform-based ECS + RDS architecture."
                },
                {
                    tr: "Müşteri değerlendirmesi: Açık İletişim, Sonuçlara Sorumluluk, Detay Odaklılık.",
                    en: "Client endorsements: Clear Communicator, Accountable for Outcomes, Detail Oriented."
                }
            ]
        },
        {
            role:     { tr: "Cloud & DevOps Mühendisi",  en: "Cloud & DevOps Engineer" },
            company:  { tr: "Müşteri Projesi",          en: "Client Project" },
            type:     { tr: "Serbest",                 en: "Freelance" },
            period:   { tr: "Devam Ediyor",            en: "Ongoing" },
            location: { tr: "Uzaktan",                 en: "Remote" },
            bullets: [
                {
                    tr: "Veteriner klinik yönetim sistemi: randevu planlama, personel paneli ve AI destekli stok takip modüllerini kapsayan tam kapsamlı full-stack uygulama geliştirildi.",
                    en: "Built a full-stack veterinary clinic management system covering appointment scheduling, a staff panel, and an AI-powered stock tracking module."
                },
                {
                    tr: "AI Stok Tahmin Modülü: ilaç ve malzeme tüketim geçmişini analiz ederek stok tükenmesini proaktif olarak tespit eden tahmin modeli entegre edildi.",
                    en: "AI Stock Prediction Module: Integrated a forecasting model that analyzes medication and supply consumption history to proactively detect potential stockouts."
                },
                {
                    tr: "Altyapı sahipliği uçtan uca üstlenildi: Supabase (PostgreSQL) veritabanı, uygulama AWS üzerinde production ortamına taşındı.",
                    en: "Owned end-to-end infrastructure: Supabase (PostgreSQL) for the database, application deployed to production on AWS."
                }
            ]
        }
    ],
    education: [
        {
            institution: "Pamukkale Üniversitesi",
            degree: { tr: "Bilgisayar Mühendisliği Lisans (Devam zorunluluğu yok)", en: "B.S. in Computer Engineering (No mandatory attendance)" }
        }
    ],
    certifications: [
        {
            tr: "AWS Certified Solutions Architect – Associate (SAA) — Devam Ediyor",
            en: "AWS Certified Solutions Architect – Associate (SAA) — In Progress"
        },
        {
            tr: "Cloud & DevOps Eğitimi (Huawei)",
            en: "Cloud & DevOps Training (Huawei)"
        },
        {
            tr: "Teknofest 2025 Sağlıkta Yapay Zeka Yarışması Finalisti (12. Sıra)",
            en: "Teknofest 2025 AI in Healthcare Competition Finalist (12th Place)",
            link: {
                url: "image/teknofest_sertifika.pdf",
                label: {
                    tr: "Katılım Sertifikasını Gör",
                    en: "View Certificate"
                }
            }
        }
    ],
    technicalSkills: [
        {
            category: {
                tr: "Bulut & Altyapı",
                en: "Cloud & Infrastructure"
            },
            items: "AWS (EC2, VPC, S3, RDS, Lambda, EKS), Oracle Cloud Infrastructure (OCI), Linux"
        },
        {
            category: {
                tr: "Konteynerizasyon & Orkestrasyon",
                en: "Containerization & Orchestration"
            },
            items: "Docker, Kubernetes"
        },
        {
            category: {
                tr: "CI/CD & Otomasyon",
                en: "CI/CD & Automation"
            },
            items: "Jenkins, GitHub Actions, n8n"
        },
        {
            category: {
                tr: "Altyapı Kod Olarak (IaC)",
                en: "Infrastructure as Code (IaC)"
            },
            items: "Terraform"
        },
        {
            category: {
                tr: "Betik",
                en: "Scripting"
            },
            items: "Bash, Python"
        },
        {
            category: {
                tr: "Veritabanları",
                en: "Databases"
            },
            items: "MySQL, Supabase"
        },
        {
            category: {
                tr: "Yazılım Geliştirme",
                en: "Software Development"
            },
            items: "Next.js"
        }
    ]
};