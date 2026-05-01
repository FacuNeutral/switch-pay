# ssh-connect.ps1
#
# Abre una sesion SSH usando el cliente nativo de Windows (OpenSSH),
# navega al path remoto indicado y deja la consola interactiva disponible.
#
# Requiere: ssh.exe (OpenSSH para Windows — incluido en Windows 10 1809+)
#
# Uso:
#   .\ssh-connect.ps1 -domain "user@host" -pass "password" -path "D:\ruta\proyecto"
#
# Ejemplo:
#   .\ssh-connect.ps1 -domain "dev@192.168.1.32" -pass "funter" -path "D:\Programacion_Extra\ldl"

param(
    [Parameter(Mandatory, HelpMessage = "user@host de la maquina remota")]
    [string]$domain,

    [Parameter(Mandatory, HelpMessage = "Contrasena SSH")]
    [string]$pass,

    [Parameter(Mandatory, HelpMessage = "Ruta remota a la que navegar al conectar")]
    [string]$path
)

# ---------------------------------------------------------------------------
# Verificar que ssh.exe este disponible
# ---------------------------------------------------------------------------
if (-not (Get-Command ssh -ErrorAction SilentlyContinue)) {
    Write-Error "ssh.exe no encontrado. Habilitalo desde: Panel de Control > Programas > Caracteristicas opcionales > OpenSSH Client"
    exit 1
}

# ---------------------------------------------------------------------------
# Intentar autenticacion silenciosa via SSH_ASKPASS
# Funciona en OpenSSH >= 8.4 con SSH_ASKPASS_REQUIRE=prefer
# ---------------------------------------------------------------------------
$askPassFile = Join-Path ([System.IO.Path]::GetTempPath()) "askpass_$(Get-Random).cmd"
"@echo off`r`necho $pass" | Set-Content -Path $askPassFile -Encoding ASCII

$env:SSH_ASKPASS         = $askPassFile
$env:SSH_ASKPASS_REQUIRE = "prefer"

Write-Host ""
Write-Host "  SSH Node Exec" -ForegroundColor Cyan
Write-Host "  Conectando a $domain" -ForegroundColor DarkCyan
Write-Host "  Path remoto: $path" -ForegroundColor DarkCyan
Write-Host ""
Write-Host "  Si aparece 'password:', escribe la contrasena manualmente" -ForegroundColor Yellow
Write-Host "  o el agente la enviara automaticamente via send_to_terminal." -ForegroundColor DarkYellow
Write-Host ""

try {
    # -t  : fuerza pseudo-TTY (sesion interactiva)
    # -o StrictHostKeyChecking=no : acepta huella del host automaticamente
    # cmd /k : mantiene la consola abierta despues de cd
    ssh -t `
        -o StrictHostKeyChecking=no `
        -o PreferredAuthentications=keyboard-interactive,password `
        -o PubkeyAuthentication=no `
        "$domain" "cmd /k cd /d `"$path`""
} finally {
    Remove-Item $askPassFile -ErrorAction SilentlyContinue
    Remove-Item Env:\SSH_ASKPASS          -ErrorAction SilentlyContinue
    Remove-Item Env:\SSH_ASKPASS_REQUIRE  -ErrorAction SilentlyContinue
}
