<?php

namespace Tests\Support;

use App\Services\Http\HostResolver;

class FakeResolver extends HostResolver
{
    /** @var array<string, array<int, string>> */
    public array $map = [];

    public function resolve(string $host): array
    {
        if (filter_var($host, FILTER_VALIDATE_IP)) {
            return [$host];
        }

        return $this->map[$host] ?? ['93.184.216.34'];
    }
}
