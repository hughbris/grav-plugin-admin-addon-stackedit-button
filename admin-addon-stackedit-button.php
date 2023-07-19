<?php
namespace Grav\Plugin;

use Grav\Common\Plugin;

/**
 * Class AdminAddonStackeditButtonPlugin
 * @package Grav\Plugin
 */
class AdminAddonStackeditButtonPlugin extends Plugin
{
    /**
     * @return array
     */
    public static function getSubscribedEvents(): array
    {
        return [
            'onPluginsInitialized' => [
                ['onPluginsInitialized', 0],
            ]
        ];
    }

    /**
     * Initialize the plugin
     */
    public function onPluginsInitialized(): void
    {
        // Only proceed if we are in the admin plugin
        if (!$this->isAdmin()) {
            return;
        }

        // Enable the main events we are interested in
        $this->enable([
            'onAssetsInitialized' => ['addAssets', 10],
        ]);
    }

    public function addAssets() {
        if ($this->isAdmin()) {
            $this->grav['assets']->addJs('https://unpkg.com/stackedit-js@1.0.7/docs/lib/stackedit.min.js'); # TODO: add this URL by config
            $this->grav['assets']->addJs("plugin://{$this->name}/assets/admin/buttons/stackedit.js");
            $this->grav['assets']->addCss("plugin://{$this->name}/css/plugin-stackedit.css");
        }
    }
}
